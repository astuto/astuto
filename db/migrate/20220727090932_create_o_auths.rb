class CreateOAuths < ActiveRecord::Migration[6.0]
  def change
    create_table :o_auths do |t|
      t.string :name, null: false
      t.string :logo
      t.boolean :is_enabled, default: false
      t.string :client_id, null: false
      t.string :client_secret, null: false
      t.string :authorize_url, null: false
      t.string :token_url, null: false
      t.string :profile_url, null: false
      t.string :scope, null: false
      t.string :json_user_name_path
      t.string :json_user_email_path, null: false
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end

    add_index :o_auths, [:name, :tenant_id], unique: true
  end
end
