class AddCustomCssToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :custom_css, :text, null: true
  end
end
