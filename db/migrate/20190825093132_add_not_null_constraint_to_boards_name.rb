class AddNotNullConstraintToBoardsName < ActiveRecord::Migration[6.0]
  def change
    change_column_null :boards, :name, false
  end
end
