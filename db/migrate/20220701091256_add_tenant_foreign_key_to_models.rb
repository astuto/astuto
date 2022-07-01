class AddTenantForeignKeyToModels < ActiveRecord::Migration[6.0]
  def change
    # Add tenant_id fk column to all models
    add_reference :boards, :tenant, foreign_key: true, null: false
    add_reference :post_statuses, :tenant, foreign_key: true, null: false
    add_reference :posts, :tenant, foreign_key: true, null: false
    add_reference :users, :tenant, foreign_key: true, null: false
    add_reference :comments, :tenant, foreign_key: true, null: false
    add_reference :likes, :tenant, foreign_key: true, null: false
    add_reference :follows, :tenant, foreign_key: true, null: false
    add_reference :post_status_changes, :tenant, foreign_key: true, null: false

    # Change index of unique columns to double index with tenant_id
    remove_index :boards, :name
    add_index :boards, [:name, :tenant_id], unique: true

    remove_index :post_statuses, :name
    add_index :post_statuses, [:name, :tenant_id], unique: true

    remove_index :users, :email
    add_index :users, [:email, :tenant_id], unique: true
  end
end
