class PostsArchiverFanoutJob
  include Sidekiq::Job

  def perform
    with_stale_post_ids do |tenant_id, stale_post_ids, archived_status_id|
      stale_post_ids.each do |stale_post_id|
        PostsArchiverExecutorJob.perform_async(tenant_id, stale_post_id, archived_status_id)
      end
    end
  end

  private

  def with_tenant
    tenants = Tenant.all
    tenants.each do |tenant|
      Current.tenant = tenant
      yield tenant
    end
  end

  def with_stale_post_ids
    with_tenant do |tenant|
      archived_status = PostStatus.find_by(name: "Rejected")
      return if archived_status.blank?

      stale_posts_query = <<~STALE_POSTS.squish
        SELECT posts.id
        FROM posts INNER JOIN post_settings ON post_settings.id = posts.post_settings_id
        WHERE (posts.updated_at < NOW() - (post_settings.archive_after||' seconds')::interval)
        AND (posts.post_status_id IS NULL OR posts.post_status_id <> #{archived_status.id});
      STALE_POSTS
      yield tenant.id, ActiveRecord::Base.connection.execute(stale_posts_query).to_a.each.with_object("id").map(&:[]), archived_status.id
    end
  end
end
