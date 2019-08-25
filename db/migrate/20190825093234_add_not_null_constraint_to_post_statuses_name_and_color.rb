class AddNotNullConstraintToPostStatusesNameAndColor < ActiveRecord::Migration[6.0]
  def change
    change_column_null :post_statuses, :name, false
    change_column_null :post_statuses, :color, false
  end
end
