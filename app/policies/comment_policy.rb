class CommentPolicy < ApplicationPolicy
  def permitted_attributes_for_create
    if user.power_user?
      [:body, :parent_id, :is_post_update]
    else
      [:body, :parent_id]
    end
  end

  def permitted_attributes_for_update
    if user.power_user?
      [:body, :is_post_update]
    else
      [:body]
    end
  end

  def update?
    user == record.user or user.power_user?
  end

  def destroy?
    user == record.user or user.power_user?
  end
end