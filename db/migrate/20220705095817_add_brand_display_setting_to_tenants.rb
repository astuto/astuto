class AddBrandDisplaySettingToTenants < ActiveRecord::Migration[6.0]
  def change
    add_column :tenants, :brand_display_setting, :integer, default: 0
  end
end
