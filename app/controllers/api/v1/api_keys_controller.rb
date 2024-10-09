module Api
  module V1
    class ApiKeysController < BaseController
      # Render info about the current API Key
      def show
        authorize([:api, current_api_key])

        render json: {
          id: current_api_key.id,
          user_id: current_api_key.user_id
        }
      end
    end
  end
end