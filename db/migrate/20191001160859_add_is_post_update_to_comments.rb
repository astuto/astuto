class AddIsPostUpdateToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :is_post_update, :boolean, null: false, default: false
  end
end
