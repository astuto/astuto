class AddCustomerIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users,:stripe_customer_id,:string
  end
end
