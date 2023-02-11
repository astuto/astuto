class TenantSettingPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [
        :brand_display,
        :root_board_id,
        :show_vote_count,
        :show_vote_button_in_board,
        :show_roadmap_in_header,
        :collapse_boards_in_header
      ]
    else
      []
    end
  end

  def update?
    user.admin? and user.tenant_id == record.id
  end
end