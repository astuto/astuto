class AddLogoLinksToToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :logo_links_to, :integer, default: 0, null: false
    add_column :tenant_settings, :logo_custom_url, :string
  end
end
