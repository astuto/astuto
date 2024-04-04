class AddSlugToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :slug, :string

    add_index :posts, :slug, unique: true
  end
end
