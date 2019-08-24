class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :description
      t.references :board, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :post_status, foreign_key: true

      t.timestamps
    end
  end
end
