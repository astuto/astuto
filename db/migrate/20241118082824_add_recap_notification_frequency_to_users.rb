class AddRecapNotificationFrequencyToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :recap_notification_frequency, :integer, default: 0, null: false
  end
end
