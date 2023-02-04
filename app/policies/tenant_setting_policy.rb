class TenantSettingPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [:brand_display, :show_vote_count, :show_vote_button_in_board]
    else
      []
    end
  end

  def update?
    user.admin? and user.tenant_id == record.id
  end
end