class CreateTenants < ActiveRecord::Migration[6.0]
  def change
    create_table :tenants do |t|
      t.string :site_name, null: false
      t.string :site_logo
      t.string :subdomain, null: false, unique: true
      t.string :locale, default: "en"
      t.string :custom_url

      t.timestamps
    end
  end
end
