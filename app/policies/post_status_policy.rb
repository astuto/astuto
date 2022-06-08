class PostStatusPolicy < ApplicationPolicy
  def create?
    user.admin?
  end
  
  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end

  def update_order?
    user.admin?
  end
end