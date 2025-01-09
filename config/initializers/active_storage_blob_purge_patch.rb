# https://github.com/rails/rails/issues/50583#issuecomment-1920061327

# ensure logger is available
logger = Rails.logger

if ENV["SKIP_ACTIVE_STORAGE_PATCH"] == "true"
  logger.info "SKIP_ACTIVE_STORAGE_PATCH is set. Skip loading Active Storage Patch ..."
else
  # Ensure variants are deleted only if variants tracking is disabled
  # This is needed because ActiveStorage::PurgeJob fails if variants are tracked
  # but also fails if variants are not tracked. The latter also keeps files in
  # the variants folder which are basically stale.
  # see https://github.com/rails/rails/issues/50583
  Rails.application.config.to_prepare do
    logger.info "Loading Active Storage Blob Purge Patch ..."

    class ActiveStorage::Blob < ActiveStorage::Record
      def delete
        service.delete(key)
        
        # Never delete variants
        # I had to edit the github snippet to make it work
        # service.delete_prefixed("variants/#{key}/") if image? && !ActiveStorage.track_variants
      end
    end
  end
end