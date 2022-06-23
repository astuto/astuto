class UserPolicy < ApplicationPolicy
  def permitted_attributes_for_update
    if user.admin?
      [:role, :status]
    elsif user.moderator?
      [:status]
    else
      []
    end
  end

  def index?
    user.power_user?
  end

  def update?
    if user.admin?
      true
    elsif user.moderator?
      record.user?
    else
      false
    end
  end
end