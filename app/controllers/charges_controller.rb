class ChargesController < ApplicationController
  skip_before_action :check_subscription
  require "stripe"
  def index
    @subscription = Subscription.find_by(id: params[:s_id])
  end

  def create
    binding.pry
    customer =  find_or_create_customer(card_token: params[:stripeToken],
                                             customer_id: current_user.stripe_customer_id,
                                             email: params[:stripeEmail])
    if customer
      current_user.update(stripe_customer_id: customer.id)
      charge = execute_subscription(plan: params[:subscription],
                                         customer: customer)
      if charge
        current_user.update(stripe_subscription_id: charge.id)
        flash[:success] = "You have subscribed successfully!"
        redirect_to users_show_url
      end
    end
  end

  def cancel_subscription
    Stripe::Subscription.delete(current_user.stripe_subscription_id)
    current_user.update(stripe_subscription_id: nil)
    flash[:success] = "Your Subscription has been cancelled!"
    redirect_to request.referer
  end

  private

  def execute_subscription(plan:, customer:)
    subscription= Stripe::Subscription.create({
                                  customer: customer.id,
                                  items: [
                                    {price: plan},
                                  ],
                                })
    subscription
  end

  def find_or_create_customer(card_token:, customer_id:, email:)
    if customer_id
        stripe_customer = Stripe::Customer.retrieve({ id: customer_id })
      if stripe_customer
        stripe_customer = Stripe::Customer.update(stripe_customer.id, { source: card_token})
      end
    else
      stripe_customer = Stripe::Customer.create({
                                                  email: email,
                                                  source: card_token
                                                })
    end
    stripe_customer
  end

end
