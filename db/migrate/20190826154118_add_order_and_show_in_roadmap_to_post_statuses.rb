class AddOrderAndShowInRoadmapToPostStatuses < ActiveRecord::Migration[6.0]
  def change
    add_column :post_statuses, :order, :integer, null: false, default: 999
    add_column :post_statuses, :show_in_roadmap, :boolean, null: false, default: false
  end
end
