class ApiKeyPolicy < ApplicationPolicy
  def create?
    user.moderator? && user == record.user
  end
end