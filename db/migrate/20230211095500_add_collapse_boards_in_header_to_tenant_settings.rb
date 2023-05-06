class AddCollapseBoardsInHeaderToTenantSettings < ActiveRecord::Migration[6.0]
  def change
    add_column :tenant_settings, :collapse_boards_in_header, :integer, null: false, default: 0
  end
end
