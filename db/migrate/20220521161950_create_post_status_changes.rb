class CreatePostStatusChanges < ActiveRecord::Migration[6.0]
  def change
    create_table :post_status_changes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.references :post_status, foreign_key: true

      t.timestamps
    end
  end
end
