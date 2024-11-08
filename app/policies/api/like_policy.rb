module Api
  class LikePolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end

    def show?
      api_key.user.moderator?
    end

    def create?
      api_key.user.moderator?
    end

    def destroy?
      api_key.user.moderator?
    end
  end
end