class SiteSettingsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin
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

  def invitations
  end

  def appearance
  end

  private

    def set_page_title
      @page_title = t('header.menu.site_settings')
    end
end