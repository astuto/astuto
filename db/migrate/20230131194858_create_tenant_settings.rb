class CreateTenantSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :tenant_settings do |t|
      t.integer :brand_display, null: false, default: 0
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end

    change_table :tenants do |t|
      t.remove :brand_display_setting
    end
  end
end
