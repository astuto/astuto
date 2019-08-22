class AddUniqueToNameOfBoards < ActiveRecord::Migration[6.0]
  def change
    add_index :boards, :name, unique: true
  end
end
