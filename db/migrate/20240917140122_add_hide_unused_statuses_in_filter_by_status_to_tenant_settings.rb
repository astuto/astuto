class AddHideUnusedStatusesInFilterByStatusToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :hide_unused_statuses_in_filter_by_status, :boolean, default: false, null: false
  end
end
