module BoardsHelper
  def get_post_statuses_to_show_in_filter
    if Current.tenant.tenant_setting.hide_unused_statuses_in_filter_by_status
      @board.posts.map(&:post_status_id).uniq
    else
      PostStatus.pluck(:id) << nil
    end
  end
end