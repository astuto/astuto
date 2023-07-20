class PostsArchiverExecutorJob
  include Sidekiq::Job

  def perform(tenant_id, post_id, post_status_id)
    Current.tenant = Tenant.find(tenant_id)

    post = Post.find_by(id: post_id)
    return if post.blank?

    post_setting = PostSetting.find_by(id: post.post_settings_id)
    return unless stale_post?(post, post_setting)

    post_status = PostStatus.find_by(id: post_status_id)
    if post_status.blank?
      post_setting.update(archive_after: 0)
      return
    end

    post.update(post_status_id: post_status_id)
    UserMailer.notify_followers_of_post_status_change(post: post).deliver_later
  end

  private

  def stale_post?(post, post_setting)
    post.updated_at < DateTime.now - (post_setting.archive_after || 0).seconds
  end
end
