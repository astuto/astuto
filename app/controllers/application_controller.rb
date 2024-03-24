require 'uri'

class ApplicationController < ActionController::Base
  include ApplicationHelper
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
        request_host_splitted = request.host.split('.')
        app_host_splitted = URI.parse(Rails.application.base_url).host.split('.')
  
        if app_host_splitted.join('.') == request_host_splitted.last(app_host_splitted.length).join('.')
          return if request.subdomain.blank? or RESERVED_SUBDOMAINS.include?(request.subdomain)
  
          current_tenant = Tenant.find_by(subdomain: request.subdomain)
        else
          current_tenant = Tenant.find_by(custom_domain: request.host)
        end
      else
        current_tenant = Tenant.first
      end

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
      @boards = Board.select(:id, :name).order(order: :asc)

      # Setup locale
      I18n.locale = @tenant.locale
    end

    def load_oauths
      @o_auths = OAuth
        .include_defaults
        .where(is_enabled: true)
        .order(created_at: :asc)
    end

  private

    def user_not_authorized
      logger.error { "User not authorized: #{user_signed_in? ? current_user.inspect : 'unlogged user'}" }

      render json: {
        error: t('errors.unauthorized')
      }, status: :unauthorized
    end
end
