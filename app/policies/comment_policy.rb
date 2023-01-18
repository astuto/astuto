class CommentPolicy < ApplicationPolicy
  def permitted_attributes_for_create
    if user.moderator?
      [:body, :parent_id, :is_post_update]
    else
      [:body, :parent_id]
    end
  end

  def permitted_attributes_for_update
    if user.moderator?
      [:body, :is_post_update]
    else
      [:body]
    end
  end

  def update?
    user == record.user or user.moderator?
  end

  def destroy?
    user == record.user or user.moderator?
  end
end