class AddSubscriptionEndsAtToTenantBilling < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_billings, :subscription_ends_at, :datetime
  end
end
