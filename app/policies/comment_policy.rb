class CommentPolicy < ApplicationPolicy
  def update?
    user == record.user or user.power_user?
  end

  def destroy?
    user == record.user or user.power_user?
  end
end