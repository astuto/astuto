class SiteSettingsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin,
    only: [:general, :boards, :post_statuses, :roadmap, :authentication]

  before_action :authenticate_moderator,
    only: [:users]
  
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

  def authentication
  end
end