module Api
  class PostPolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end

    def show?
      api_key.user.moderator?
    end

    def create?
      api_key.user.moderator?
    end

    def update?
      api_key.user.moderator?
    end

    def destroy?
      api_key.user.moderator?
    end

    def update_board?
      api_key.user.moderator?
    end

    def update_status?
      api_key.user.moderator?
    end

    def approve?
      api_key.user.moderator?
    end

    def reject?
      api_key.user.moderator?
    end
  end
end