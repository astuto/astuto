class AddDescriptionToSubscription < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions,:description,:text
  end
end
