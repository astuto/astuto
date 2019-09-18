class AddOrderToBoards < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :order, :integer, null: false, default: 999
  end
end
