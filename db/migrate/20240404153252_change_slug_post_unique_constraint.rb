class ChangeSlugPostUniqueConstraint < ActiveRecord::Migration[6.1]
  def change
    remove_index :posts, :slug
    add_index :posts, [:slug, :tenant_id], unique: true
  end
end
