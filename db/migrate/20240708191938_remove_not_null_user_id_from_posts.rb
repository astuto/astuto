class RemoveNotNullUserIdFromPosts < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :user_id, :bigint, null: true
  end
end
