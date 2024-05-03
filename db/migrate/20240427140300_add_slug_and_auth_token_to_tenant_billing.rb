class AddSlugAndAuthTokenToTenantBilling < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_billings, :slug, :string
    add_column :tenant_billings, :auth_token, :string

    add_index :tenant_billings, :slug, unique: true
  end
end
