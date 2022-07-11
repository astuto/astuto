class TenantsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:show, :update]

  def new
    @page_title = t('signup.page_title')
  end

  def show
    render json: Current.tenant_or_raise!
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

  private

    def tenant_update_params
      params
        .require(:tenant)
        .permit(policy(@tenant).permitted_attributes_for_update)
    end
end