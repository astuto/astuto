class CreateTenantBillings < ActiveRecord::Migration[6.1]
  def change
    create_table :tenant_billings do |t|
      t.references :tenant, null: false, foreign_key: true
      t.integer :status, null: false, default: 0
      t.datetime :trial_ends_at

      t.timestamps
    end
  end
end
