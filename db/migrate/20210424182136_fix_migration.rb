class FixMigration < ActiveRecord::Migration[6.0]
  def change
    add_column :users,:stripe_subscription_id,:string
    remove_column :subscriptions,:stripe_subscription_id

  end
end
