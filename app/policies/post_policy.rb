class PostPolicy < ApplicationPolicy
  def permitted_attributes_for_create
    [:title, :description, :board_id]
  end

  def permitted_attributes_for_update
    if user.power_user?
      [:title, :description, :board_id, :post_status_id]
    else
      [:title, :description]
    end
  end

  def update?
    user == record.user or user.power_user?
  end

  def destroy?
    user == record.user or user.power_user?
  end
end