module Api
  class BaseController < ApplicationController
    include ApplicationHelper
    include Pundit::Authorization

    rescue_from StandardError, with: :unexpected_error # Must be at the top, catches exceptions not caught by other rescue_from
    rescue_from ActiveRecord::InvalidForeignKey, with: :parameter_wrong
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActionController::ParameterMissing, with: :parameter_missing
    rescue_from Pundit::NotAuthorizedError, with: :not_authorized
    rescue_from Api::V1::Helpers::ImpersonationError, with: :impersonation_error
    
    skip_before_action :verify_authenticity_token
    skip_before_action :check_tenant_is_private
    skip_before_action :load_tenant_data

    before_action :authenticate_with_api_key
    prepend_before_action :set_current_tenant
 
    attr_reader :current_user, :current_api_key

    def pundit_user
      current_api_key
    end
 
    protected

      def set_current_tenant
        Current.tenant = get_tenant_from_request(request)
        
        # If current tenant is nil, return generic error message
        request_http_token_authentication if Current.tenant.nil?

        I18n.locale = I18n.default_locale
      end

      def not_authorized
        render status: :unauthorized, json: {
          errors: ['You are not authorized to perform this action.']
        }
      end

      def parameter_missing
        render status: :bad_request, json: {
          errors: ['Some parameters are missing from the request. Please check the documentation.']
        }
      end

      def parameter_wrong
        render status: :bad_request, json: {
          errors: ['Some parameters are wrong in the request. Please check the documentation.']
        }
      end

      def not_found(exception)
        render status: :not_found, json: {
          errors: [exception.message]
        }
      end

      def impersonation_error(exception)
        render status: :unauthorized, json: {
          errors: ["Impersonation error: #{exception.message}"]
        }
      end

      def unexpected_error(exception)
        if Rails.env.development?
          error = '[DEV-ONLY MESSAGE] ' + exception.message
        else
          error = 'An unexpected error occurred.'
        end
        
        render status: :internal_server_error, json: {
          errors: [error]
        }
      end
 
      def authenticate_with_api_key
        authenticate_or_request_with_http_token do |token, options|
          @current_api_key = ApiKey.find_by_token(token)
          @current_user = current_api_key&.user
        end
      end
 
      # Override rails default 401 response to return JSON content-type
      # with request for Bearer token
      # https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token/ControllerMethods.html
      def request_http_token_authentication(realm = "Application", message = nil)
        json_response = { errors: [message || "Access denied."] }
        headers["WWW-Authenticate"] = %(Bearer realm="#{realm.tr('"', "")}")
        render json: json_response, status: :unauthorized
      end
  end
end
