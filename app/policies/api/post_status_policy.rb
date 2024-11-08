module Api
  class PostStatusPolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end
  end
end