module Api
  class ApiKeyPolicy < BasePolicy
    def show?
      api_key.user.admin?
    end
  end
end