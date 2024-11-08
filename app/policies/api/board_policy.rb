module Api
  class BoardPolicy < BasePolicy
    def index?
      api_key.user.moderator?
    end
    
    def show?
      api_key.user.moderator?
    end

    def create?
      api_key.user.admin?
    end
  end
end