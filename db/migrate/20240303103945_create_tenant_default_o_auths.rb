class CreateTenantDefaultOAuths < ActiveRecord::Migration[6.1]
  def change
    create_table :tenant_default_o_auths do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :o_auth, null: false, foreign_key: true

      t.timestamps
    end
  end
end
