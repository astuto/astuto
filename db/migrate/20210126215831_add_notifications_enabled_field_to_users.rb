class AddNotificationsEnabledFieldToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :notifications_enabled, :boolean, null: false, default: true
  end
end
