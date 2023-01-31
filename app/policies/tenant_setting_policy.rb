class TenantSettingPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [:brand_display]
    else
      []
    end
  end

  def update?
    user.admin? and user.tenant_id == record.id
  end
end