class SiteSettingsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:general, :boards, :post_statuses, :roadmap]
  before_action :authenticate_power_user, only: [:users]
  
  def general
  end

  def boards
  end

  def post_statuses
  end

  def roadmap
  end

  def users
  end
end