class TenantPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [:site_name, :site_logo, :locale]
    else
      []
    end
  end

  def update?
    user.admin? and user.tenant_id == record.id
  end
end