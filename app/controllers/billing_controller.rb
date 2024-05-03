require 'stripe'

class BillingController < ApplicationController
  before_action :check_multi_tenancy
  before_action :authenticate_owner, only: :request_billing_page
  before_action :set_tenant_on_billing_subdomain, only: [:create_checkout_session, :session_status]
  skip_before_action :verify_authenticity_token, only: :webhook

  def request_billing_page
    tb = Current.tenant.tenant_billing
    tenant_id = tb.slug
    auth_token = tb.generate_auth_token

    redirect_to billing_url(tenant_id: tenant_id, auth_token: auth_token)
  end

  def index
    return unless params[:tenant_id] and params[:auth_token]

    tb = TenantBilling.unscoped.find_by(slug: params[:tenant_id])
    Current.tenant = tb.tenant

    if is_current_user_owner? || tb.auth_token == params[:auth_token]
      @page_title = t('billing.title')
      load_tenant_data_for_billing

      # log in owner on "billing" subdomain
      owner = Current.tenant.owner
      sign_in owner
      tb.invalidate_auth_token

      # get prices from stripe
      @prices = Stripe::Price.list({
        lookup_keys: [
          Rails.application.stripe_monthly_lookup_key,
          Rails.application.stripe_yearly_lookup_key
        ],
        active: true
      }).data
      @prices = @prices.sort_by { |price| price.unit_amount }
    else
      redirect_to get_url_for(method(:root_url))
    end
  end

  def return
    return unless params[:tenant_id]

    tb = TenantBilling.unscoped.find_by(slug: params[:tenant_id])
    Current.tenant = tb.tenant

    if is_current_user_owner?
      @page_title = t('billing.title')
      load_tenant_data_for_billing
    else
      redirect_to get_url_for(method(:root_url))
    end
  end

  def create_checkout_session
    session = Stripe::Checkout::Session.create({
      ui_mode: 'embedded',
      line_items: [{
        price: params[:price_id],
        quantity: 1,
      }],
      mode: 'subscription',
      return_url: "#{billing_return_url}?session_id={CHECKOUT_SESSION_ID}&tenant_id=#{params[:tenant_id]}",
      customer: Current.tenant.tenant_billing.customer_id,
    })

    render json: { clientSecret: session.client_secret }
  end

  def session_status
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    render json: { status: session.status, session: session }
  end

  def webhook
    event = nil

    begin
      sig_header = request.env['HTTP_STRIPE_SIGNATURE']
      payload = request.body.read
      event = Stripe::Webhook.construct_event(payload, sig_header, Rails.application.stripe_endpoint_secret)
    rescue JSON::ParserError => e
      # Invalid payload
      return head :bad_request
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      return head :bad_request
    end

    if event['type'] == 'invoice.paid'
      Current.tenant = get_tenant_from_customer_id(event.data.object.customer)
      
      monthly_lookup_key = Rails.application.stripe_monthly_lookup_key
      yearly_lookup_key = Rails.application.stripe_yearly_lookup_key
      
      subscription_type = event.data.object.lines.data.last.price.lookup_key
      return head :bad_request unless subscription_type == monthly_lookup_key || subscription_type == yearly_lookup_key

      old_subscription_status = Current.tenant.tenant_billing.status

      subscription_duration = subscription_type == monthly_lookup_key ? 1.month : 1.year
      Current.tenant.tenant_billing.update!(
        status: 'active',
        subscription_ends_at: Time.current + subscription_duration
      )

      if old_subscription_status == 'trial'
        TenantMailer.subscription_confirmation(tenant: Current.tenant).deliver_later
      end
    elsif event['type'] == 'customer.subscription.updated'
      Current.tenant = get_tenant_from_customer_id(event.data.object.customer)

      if Current.tenant.tenant_billing.status == 'active' || Current.tenant.tenant_billing.status == 'canceled'
        has_canceled = event.data.object.cancel_at_period_end
        Current.tenant.tenant_billing.update!(status: has_canceled ? 'canceled' : 'active')

        if has_canceled
          TenantMailer.cancellation_confirmation(tenant: Current.tenant).deliver_later
        else
          TenantMailer.renewal_confirmation(tenant: Current.tenant).deliver_later
        end
      end
    end

    return head :ok
  end

  private

    def check_multi_tenancy
      redirect_to root_path unless Rails.application.multi_tenancy?
    end

    def get_tenant_from_customer_id(customer_id)
      TenantBilling.unscoped.find_by(customer_id: customer_id).tenant
    end

    def is_current_user_owner?
      user_signed_in? && current_user.tenant_id == Current.tenant.id && current_user.owner?
    end

    def set_tenant_on_billing_subdomain
      tb = TenantBilling.unscoped.find_by(slug: params[:tenant_id])
      Current.tenant = tb.tenant
      
      unless is_current_user_owner?
        render json: {
          error: t('errors.unauthorized')
        }, status: :unauthorized
        return
      end
    end

    def load_tenant_data_for_billing
      # needed because ApplicationController#load_tenant_data is not called for this action
      @tenant = Current.tenant
      @tenant_setting = @tenant.tenant_setting
      @tenant_billing = @tenant.tenant_billing
      @boards = Board.select(:id, :name, :slug).order(order: :asc)
      I18n.locale = @tenant.locale

      # needed because signing out from 'billing' subdomain cause authenticity token error
      @disable_sign_out = true
    end
end