require 'stripe'

class BillingController < ApplicationController
  before_action :check_multi_tenancy
  skip_before_action :verify_authenticity_token, only: :webhook

  def index
    @page_title = t('billing.title')
    @prices = Stripe::Price.list({limit: 2}).data
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

    if event['type'] == 'checkout.session.completed'
      session = get_session_from_event(event)
      Current.tenant = get_tenant_from_session(session)
      
      subscription_type = session.line_items.data[0].price.lookup_key
      return head :bad_request unless subscription_type == 'monthly' || subscription_type == 'yearly'

      subscription_duration = subscription_type == 'monthly' ? 1.month : 1.year
      Current.tenant.tenant_billing.update!(
        status: 'active',
        subscription_ends_at: Time.current + subscription_duration + 1.day
      )
    end

    return head :ok
  end

  private

    def check_multi_tenancy
      redirect_to root_path unless Rails.application.multi_tenancy?
    end

    def get_session_from_event(event)
      Stripe::Checkout::Session.retrieve({
        id: event['data']['object']['id'],
        expand: ['line_items'],
      })
    end

    def get_tenant_from_session(session)
      TenantBilling.unscoped.find_by(customer_id: session.customer).tenant
    end
end