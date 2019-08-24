class AddUniqueToNameOfPostStatuses < ActiveRecord::Migration[6.0]
  def change
    add_index :post_statuses, :name, unique: true
  end
end
