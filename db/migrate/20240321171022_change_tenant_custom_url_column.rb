class ChangeTenantCustomUrlColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :tenants, :custom_url, :custom_domain
    add_index :tenants, :custom_domain, unique: true
  end
end
