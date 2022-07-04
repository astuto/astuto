class ApplicationController < ActionController::Base
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :configure_permitted_parameters, if: :devise_controller?
  prepend_before_action :load_tenant_data

  protected

    def configure_permitted_parameters
      additional_permitted_parameters = [:full_name, :notifications_enabled]

      devise_parameter_sanitizer.permit(:sign_up, keys: additional_permitted_parameters)
      devise_parameter_sanitizer.permit(:account_update, keys: additional_permitted_parameters)
    end

    def load_tenant_data
      return unless request.subdomain.present?

      # Load the current tenant based on subdomain
      Current.tenant = Tenant.find_by(subdomain: request.subdomain)

      # Load tenants data
      @boards = Board.select(:id, :name).order(order: :asc)
    end

  private

    def user_not_authorized
      render json: {
        error: t('backend.errors.unauthorized')
      }, status: :unauthorized
    end
end
