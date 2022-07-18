class AddStatusToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :status, :integer
  end
end
