require 'uri'

class ApplicationController < ActionController::Base
  include ApplicationHelper
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :configure_permitted_parameters, if: :devise_controller?
  prepend_before_action :load_tenant_data

  # Override Devise after sign in path
  def after_sign_in_path_for(resource)
    if resource.admin? && resource.sign_in_count == 1
      root_path(tour: true)
    else
      super
    end
  end

  protected

    def configure_permitted_parameters
      additional_permitted_parameters = [:full_name, :notifications_enabled]

      devise_parameter_sanitizer.permit(:sign_up, keys: additional_permitted_parameters)
      devise_parameter_sanitizer.permit(:account_update, keys: additional_permitted_parameters)
    end

    def load_tenant_data
      # Set default locale
      I18n.locale = I18n.default_locale

      current_tenant = get_tenant_from_request(request)
      return unless current_tenant

      if current_tenant.status == "pending" and controller_name != "confirmation" and action_name != "show"
        redirect_to pending_tenant_path; return
      end

      if current_tenant.status == "blocked"
        redirect_to blocked_tenant_path; return
      end

      Current.tenant = current_tenant

      # Load tenant data
      @tenant = Current.tenant_or_raise!
      @tenant_setting = TenantSetting.first_or_create
      @tenant_billing = TenantBilling.first_or_create
      @boards = Board.select(:id, :name, :slug).order(order: :asc)

      # Set tenant locale
      I18n.locale = @tenant.locale
    end

    def load_oauths
      @o_auths = OAuth
        .include_defaults
        .where(is_enabled: true)
        .order(created_at: :asc)
    end

    def check_tenant_subscription
      return if Current.tenant.tenant_billing.has_active_subscription?

      render json: {
        error: 'Your subscription has expired. Please renew it to continue using the service.'
      }, status: :forbidden
    end

  private

    def user_not_authorized
      logger.error { "User not authorized: #{user_signed_in? ? current_user.inspect : 'unlogged user'}" }

      render json: {
        error: t('errors.unauthorized')
      }, status: :unauthorized
    end
end
