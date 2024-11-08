class CreateApiKeys < ActiveRecord::Migration[6.1]
  def change
    create_table :api_keys do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.string :common_token_prefix, null: false
      t.string :random_token_prefix, null: false
      t.string :token_digest, null: false

      t.timestamps

      t.index :token_digest, unique: true
      t.index [:user_id, :tenant_id], unique: true
    end
  end
end
