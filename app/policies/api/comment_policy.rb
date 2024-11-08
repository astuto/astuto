module Api
  class CommentPolicy < BasePolicy
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

    def mark_as_post_update?
      api_key.user.moderator?
    end

    def unmark_as_post_update?
      api_key.user.moderator?
    end
  end
end