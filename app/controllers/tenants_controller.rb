require 'httparty'

class TenantsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:show, :update]

  def new
    @page_title = "Create your feedback space"
    @o_auths = OAuth.unscoped.where(tenant_id: nil, is_enabled: true)
  end

  def show
    render json: Current.tenant_or_raise!
  end

  def create
    @tenant = Tenant.new
    @tenant.assign_attributes(tenant_create_params)
    authorize @tenant

    is_o_auth_login = params[:settings][:is_o_auth_login]

    ActiveRecord::Base.transaction do
      if is_o_auth_login
        # Check if OAuth email and username coincide with submitted ones
        # (session[:o_auth_sign_up] set in oauth#callback)
        email, username = session[:o_auth_sign_up].split(",", 2)
        raise "Mismatching email in OAuth login" unless email == params[:user][:email]

        @tenant.status = "active" # no need to verify email address if logged in with oauth
      end

      # Check how many times this email registered a tenant
      already_registered_tenants = User.unscoped.where(email: params[:user][:email], role: User.roles[:owner]).count
      raise "Too many tenants registered by email" unless already_registered_tenants < 3

      @tenant.save!
      Current.tenant = @tenant

      @user = User.new(
        full_name: params[:user][:full_name] || I18n.t('defaults.user_full_name'),
        email: params[:user][:email],
        password: is_o_auth_login ? Devise.friendly_token : params[:user][:password],
        role: "owner"
      )

      if is_o_auth_login
        @user.skip_confirmation
      end

      @user.save!

      CreateWelcomeEntitiesWorkflow.new().run

      logger.info { "New tenant registration: #{Current.tenant.inspect}" }

      render json: @tenant, status: :created

    rescue ActiveRecord::RecordInvalid => exception
      logger.error { "Error in tenant registration: #{exception}" }

      render json: { error: exception }, status: :unprocessable_entity
    end
  end

  def update
    @tenant = Current.tenant_or_raise!
    authorize @tenant

    # If the custom domain has changed, we need to provision SSL certificate
    custom_domain_response = AddCustomDomainWorkflow.new(
      new_custom_domain: params[:tenant][:custom_domain],
      current_custom_domain: @tenant.custom_domain
    ).run

    if custom_domain_response == false
      render json: {
        error: "Error adding custom domain"
      }, status: :unprocessable_entity
      return
    end

    # Since custom_domain is unique at db level, we need to set it to nil if it is blank
    # to avoid unique constraint violation
    params[:tenant][:custom_domain] = nil if params[:tenant][:custom_domain].blank?

    if @tenant.update(tenant_update_params)
      render json: @tenant
    else
      render json: {
        error: @tenant.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # Given a new_subdomain
  # Returns true if it is available, false otherwise
  def is_available
    subdomain = params[:new_subdomain]

    return unless subdomain.present?
    return if RESERVED_SUBDOMAINS.include?(subdomain)
    return if Tenant.exists?(subdomain: subdomain)

    render json: { is_available: 'true' }
  end

  private

    def tenant_create_params
      params
        .require(:tenant)
        .permit(policy(@tenant).permitted_attributes_for_create)
    end

    def tenant_update_params
      params
        .require(:tenant)
        .permit(
          policy(@tenant)
          .permitted_attributes_for_update
          .concat([{
            tenant_setting_attributes: policy(@tenant.tenant_setting).permitted_attributes_for_update
          }]) # in order to permit nested attributes for tenant_setting
        )
    end
end