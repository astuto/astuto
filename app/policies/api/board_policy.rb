module Api
  class BoardPolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end
    
    def show?
      api_key.user.moderator?
    end
  end
end