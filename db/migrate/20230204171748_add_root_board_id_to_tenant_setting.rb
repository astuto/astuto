class AddRootBoardIdToTenantSetting < ActiveRecord::Migration[6.0]
  def change
    add_column :tenant_settings, :root_board_id, :integer, null: false, default: 0
  end
end
