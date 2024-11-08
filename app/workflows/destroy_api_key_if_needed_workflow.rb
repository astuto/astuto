# This class is responsible for destroying the API key of a user if they get demoted or blocked

class DestroyApiKeyIfNeededWorkflow
  def initialize(user:)
    @user = user
  end

  def run
    if @user.role_changed?
      # If user gets demoted, remove their API key
      if (@user.role_was == 'admin' && @user.role == 'moderator') || (@user.role_was == 'moderator' && @user.role == 'user')
        @user.api_key&.destroy
      end
    elsif @user.status_changed?
      # If user gets blocked, remove their API key
      if @user.blocked? || @user.deleted?
        @user.api_key&.destroy
      end
    end
  end
end