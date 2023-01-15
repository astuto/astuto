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
    user.moderator?
  end

  def update?
    if user.owner?
      record.id != user.id
    elsif user.admin?
      record.role == 'moderator' || record.role == 'user'
    elsif user.moderator?
      record.role == 'user'
    else
      false
    end
  end
end