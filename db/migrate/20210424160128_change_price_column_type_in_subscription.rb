class ChangePriceColumnTypeInSubscription < ActiveRecord::Migration[6.0]
  def change
    change_column :subscriptions,:price,:decimal
  end
end
