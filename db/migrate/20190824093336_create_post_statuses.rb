class CreatePostStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :post_statuses do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
