class TenantPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [:site_name, :site_logo, :brand_display_setting, :locale]
    else
      []
    end
  end

  def update?
    user.admin? and user.tenant_id == record.id
  end
end