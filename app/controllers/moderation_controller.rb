class ModerationController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_moderator
  before_action :set_page_title

  def feedback
  end

  def users
  end

  private

    def set_page_title
      @page_title = t('header.menu.moderation')
    end
end