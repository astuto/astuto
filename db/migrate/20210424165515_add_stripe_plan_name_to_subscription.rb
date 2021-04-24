class AddStripePlanNameToSubscription < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions,:stripe_plan_name,:string
  end
end
