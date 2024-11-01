module Api
  class BaseController < ApplicationController
    include ApplicationHelper
    include Pundit::Authorization

    rescue_from Pundit::NotAuthorizedError, with: :not_authorized
    rescue_from ActionController::ParameterMissing, with: :parameter_missing

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
