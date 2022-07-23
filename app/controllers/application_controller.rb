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
      if Rails.application.multi_tenancy?
        return if request.subdomain.blank? or RESERVED_SUBDOMAINS.include?(request.subdomain)

        # Load the current tenant based on subdomain
        current_tenant = Tenant.find_by(subdomain: request.subdomain)

        if current_tenant.status == "pending" and controller_name != "confirmation" and action_name != "show"
          redirect_to pending_tenant_path; return
        end

        if current_tenant.status == "blocked"
          redirect_to blocked_tenant_path; return
        end

        redirect_to showcase_url unless current_tenant
      else
        # Load the one and only tenant
        current_tenant = Tenant.first
      end

      return unless current_tenant
      Current.tenant = current_tenant

      # Load tenant data
      @tenant = Current.tenant_or_raise!
      @boards = Board.select(:id, :name).order(order: :asc)

      # Setup locale
      I18n.locale = @tenant.locale
    end

  private

    def user_not_authorized
      render json: {
        error: t('errors.unauthorized')
      }, status: :unauthorized
    end
end
