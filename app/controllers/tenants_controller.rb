class TenantsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:show]

  def show
    render json: Current.tenant_or_raise!
  end
end