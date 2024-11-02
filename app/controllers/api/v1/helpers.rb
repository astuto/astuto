module Api
  module V1
    module Helpers
      class ImpersonationError < StandardError; end

      # Impersonate a user if requested
      # Note: only administrators can impersonate other users
      # @param impersonated_user_id [Integer] the user id to impersonate
      # @param current_user_id [Integer] the current user id (the one making the request with the API key)
      def impersonate_user_if_requested(impersonated_user_id, current_user_id)
        return current_user_id unless impersonated_user_id.present?
        raise ImpersonationError, "You are not allowed to impersonate other users." unless User.find_by(id: current_user_id).admin?
        raise ImpersonationError, "Could not find the user to impersonate." unless User.find_by(id: impersonated_user_id).present?

        impersonated_user_id
      end
    end
  end
end
