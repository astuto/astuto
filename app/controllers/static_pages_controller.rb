class StaticPagesController < ApplicationController
  skip_before_action :load_tenant_data, only: [:showcase, :pending_tenant, :blocked_tenant]

  def root
    @board = Board.find_by(id: Current.tenant.tenant_setting.root_board_id)

    if @board
      @page_title = @board.name
      render 'boards/show'
    else
      @page_title = t('roadmap.title')
      get_roadmap_data
      render 'static_pages/roadmap'
    end
  end

  def roadmap
    @page_title = t('roadmap.title')
    get_roadmap_data
  end

  def showcase
    render html: 'Showcase home page.'
  end

  def pending_tenant
  end

  def blocked_tenant
  end

  private

    def get_roadmap_data
      @post_statuses = PostStatus
        .find_roadmap
        .select(:id, :name, :color)

      @posts = Post
        .find_with_post_status_in(@post_statuses)
        .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
    end
end