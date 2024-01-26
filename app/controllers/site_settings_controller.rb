class SiteSettingsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin,
    only: [:general, :authentication, :boards, :post_statuses, :roadmap, :appearance]

  before_action :authenticate_moderator,
    only: [:users]

  before_action :set_page_title
  
  def general
  end

  def authentication
  end

  def boards
  end

  def post_statuses
  end

  def roadmap
  end

  def appearance
  end

  def users
  end

  private

    def set_page_title
      @page_title = t('header.menu.site_settings')
    end
end