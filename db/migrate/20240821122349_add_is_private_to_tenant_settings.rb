class AddIsPrivateToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :is_private, :boolean, default: false, null: false
  end
end
