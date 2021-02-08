class AddSlugToBoards < ActiveRecord::Migration[6.0]
  def change
	add_column :boards, :slug, :string, null: false
	add_index :boards, :slug, unique: true
  end
end
