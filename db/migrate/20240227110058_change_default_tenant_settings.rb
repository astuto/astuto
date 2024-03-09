class ChangeDefaultTenantSettings < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tenant_settings, :show_vote_count, true
    change_column_default :tenant_settings, :show_vote_button_in_board, true
    change_column_default :tenant_settings, :show_powered_by, true
  end
end
