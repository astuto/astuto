class SiteSettingsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin
  
  def general
  end

  def post_statuses
  end
end