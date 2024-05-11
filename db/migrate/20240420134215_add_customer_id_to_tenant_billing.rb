class AddCustomerIdToTenantBilling < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_billings, :customer_id, :string
  end
end
