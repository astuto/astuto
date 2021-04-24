class AddStripeSubscriptionIdToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions,:stripe_subscription_id,:string
  end
end
