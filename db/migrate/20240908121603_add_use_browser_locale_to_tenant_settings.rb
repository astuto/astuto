class AddUseBrowserLocaleToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :use_browser_locale, :boolean, default: false, null: false
  end
end
