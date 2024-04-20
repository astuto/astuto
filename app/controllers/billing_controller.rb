require 'stripe'

class BillingController < ApplicationController
  before_action :check_multi_tenancy

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
    })

    render json: { clientSecret: session.client_secret }
  end

  def session_status
    session = Stripe::Checkout::Session.retrieve(params[:session_id])
    render json: { status: session.status, session: session }
  end

  private

    def check_multi_tenancy
      redirect_to root_path unless Rails.application.multi_tenancy?
    end
end