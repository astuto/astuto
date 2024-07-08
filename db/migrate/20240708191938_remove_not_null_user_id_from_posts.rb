class RemoveNotNullUserIdFromPosts < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :user_id, :integer, null: true
  end
end
