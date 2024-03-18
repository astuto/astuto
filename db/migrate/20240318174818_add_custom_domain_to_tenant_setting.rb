class AddCustomDomainToTenantSetting < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :custom_domain, :string
  end
end
