require 'stripe'

class BillingController < ApplicationController
  before_action :check_multi_tenancy
  before_action :authenticate_owner, only: [:request_billing_page, :return]
  skip_before_action :verify_authenticity_token, only: [:create_checkout_session, :webhook]

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

    if (user_signed_in? && current_user.owner?) || (tb.auth_token == params[:auth_token])
      # needed because ApplicationController#load_tenant_data is not called for this action
      @tenant = tb.tenant
      @tenant_setting = @tenant.tenant_setting
      @tenant_billing = tb
      @boards = Board.select(:id, :name, :slug).order(order: :asc)
      I18n.locale = @tenant.locale

      owner = User.find_by(role: "owner")
      sign_in owner
      tb.invalidate_auth_token

      @page_title = t('billing.title')
      @prices = Stripe::Price.list({limit: 2}).data
    else
      redirect_to get_url_for(method(:root_url))
    end
  end

  def return
    @page_title = t('billing.title')

    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    Current.tenant.tenant_billing.update!(customer_id: session.customer)
  end

  def create_checkout_session
    session = Stripe::Checkout::Session.create({
      ui_mode: 'embedded',
      line_items: [{
        price: params[:price_id],
        quantity: 1,
      }],
      mode: 'subscription',
      return_url: "#{get_url_for(method(:billing_return_url))}?session_id={CHECKOUT_SESSION_ID}",
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

    # Verify webhook signature and extract the event
    # See https://stripe.com/docs/webhooks#verify-events for more information.
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
      
      subscription_type = event.data.object.lines.data[0].price.lookup_key
      return head :bad_request unless subscription_type == 'monthly' || subscription_type == 'yearly'

      subscription_duration = subscription_type == 'monthly' ? 1.month : 1.year
      Current.tenant.tenant_billing.update!(
        status: 'active',
        subscription_ends_at: Time.current + subscription_duration
      )
    elsif event['type'] == 'customer.subscription.updated'
      Current.tenant = get_tenant_from_customer_id(event.data.object.customer)

      has_canceled = event.data.object.cancel_at_period_end
      Current.tenant.tenant_billing.update!(status: has_canceled ? 'canceled' : 'active')
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
end