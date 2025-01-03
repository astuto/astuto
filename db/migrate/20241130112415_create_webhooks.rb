class CreateWebhooks < ActiveRecord::Migration[6.1]
  def change
    create_table :webhooks do |t|
      t.string :name, null: false
      t.string :description
      t.boolean :is_enabled, null: false, default: false
      t.integer :trigger, null: false, default: 0
      t.string :url, null: false
      t.text :http_body
      t.integer :http_method, null: false, default: 0
      t.json :http_headers
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end

    add_index :webhooks, [:name, :tenant_id], unique: true
  end
end
