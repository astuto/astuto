class RemoveDefaultOrderFromBoardsAndPostStatuses < ActiveRecord::Migration[6.0]
  def change
    change_column_default :boards, :order, nil
    change_column_default :post_statuses, :order, nil
  end
end
