class PostPolicy < ApplicationPolicy
  def permitted_attributes_for_create
    # dnf1, dnf2 and component_rendered_at fields are anti spam fields
    [:title, :description, :board_id, :dnf1, :dnf2, :component_rendered_at]
  end

  def permitted_attributes_for_update
    if user.moderator?
      [:title, :description, :board_id, :post_status_id]
    else
      [:title, :description]
    end
  end

  def update?
    user == record.user or user.moderator?
  end

  def destroy?
    user == record.user or user.moderator?
  end
end