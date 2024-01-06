class CreatePostSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :post_settings do |t|
      t.integer :archive_after, null: false, default: 0
      t.references :tenant, foreign_key: true, null: false

      t.timestamps
    end

    add_reference :posts, :post_settings
  end
end
