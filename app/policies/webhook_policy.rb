class WebhookPolicy < ApplicationPolicy
  def permitted_attributes
    if user.admin?
      [
        :name,
        :description,
        :is_enabled,
        :trigger,
        :url,
        :http_body,
        :http_method,
        :http_headers
      ]
    else
      []
    end
  end

  def index?
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