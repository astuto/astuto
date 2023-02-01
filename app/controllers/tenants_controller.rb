class TenantsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:show, :update]

  def new
    @page_title = t('signup.page_title')
  end

  def show
    render json: Current.tenant_or_raise!
  end

  def create
    @tenant = Tenant.new
    @tenant.assign_attributes(tenant_create_params)
    authorize @tenant

    ActiveRecord::Base.transaction do
      @tenant.save!
      Current.tenant = @tenant
      
      @user = User.create!(
        full_name: params[:user][:full_name],
        email: params[:user][:email],
        password: params[:user][:password],
        role: "owner"
      )
      
      render json: @tenant, status: :created

    rescue ActiveRecord::RecordInvalid => exception
      render json: { error: exception }, status: :unprocessable_entity
    end
  end

  def update
    @tenant = Current.tenant_or_raise!
    authorize @tenant

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