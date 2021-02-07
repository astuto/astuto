class AddSlugToBoards < ActiveRecord::Migration[6.0]
  def up
    add_column :boards, :slug, :string, null: true
    add_index :boards, :slug, unique: true

    Board.find_each do |board|
      slug = board.name.parameterize
      board.update!(slug: slug)
    end

    change_column_null :boards, :slug, false
  end

  def down
    remove_column :boards, :slug
  end
end
