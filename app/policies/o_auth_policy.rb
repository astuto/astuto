class OAuthPolicy < ApplicationPolicy
  def permitted_attributes
    if user.admin?
      [
        :name,
        :logo,
        :is_enabled,
        :client_id,
        :client_secret,
        :authorize_url,
        :token_url,
        :profile_url,
        :scope,
        :json_user_name_path,
        :json_user_email_path
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