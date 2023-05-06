class AddShowVoteAndButtonVoteToTenantSetting < ActiveRecord::Migration[6.0]
  def change
    add_column :tenant_settings, :show_vote_count, :boolean, null: false, default: false
    add_column :tenant_settings, :show_vote_button_in_board, :boolean, null: false, default: false
  end
end
