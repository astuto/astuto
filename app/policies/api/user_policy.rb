module Api
  class UserPolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end

    def show?
      api_key.user.moderator?
    end

    def show_by_email?
      api_key.user.moderator?
    end

    def create?
      api_key.user.moderator?
    end

    # Moderators can block users
    # Admins can block everyone except the owner
    # Owner can block everyone
    # Users can't block themselves
    def block?
      (api_key.user.id != record.id) && ((api_key.user.moderator? && !record.moderator?) || (api_key.user.admin? && !record.owner?) || api_key.user.owner?)
    end
  end
end