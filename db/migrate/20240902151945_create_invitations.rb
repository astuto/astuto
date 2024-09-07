class CreateInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.string :email, null: false
      t.string :token_digest, null: false
      t.datetime :accepted_at
      t.references :tenant, null: false, foreign_key: true

      t.timestamps

      t.index [:email, :tenant_id], unique: true
    end
  end
end
