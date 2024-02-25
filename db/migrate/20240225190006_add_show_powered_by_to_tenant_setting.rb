class AddShowPoweredByToTenantSetting < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :show_powered_by, :boolean, null: false, default: false
  end
end
