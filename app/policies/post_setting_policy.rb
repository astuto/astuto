class PostSettingPolicy < ApplicationPolicy
  def permitted_attributes_for_create
    [:archive_after]
  end

  def permitted_attributes_for_update
    [:archive_after]
  end

  def index?
    user.admin?
  end

  def show?
    user.admin?
  end

  def create?
    user.admin?
  end
  
  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end
end