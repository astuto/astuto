module ApplicationHelper
  def check_user_signed_in
    unless user_signed_in?
      flash[:alert] = t('backend.errors.not_logged_in')
      redirect_to new_user_session_path
      
      return false
    end
  end

  def authenticate_admin
    return if check_user_signed_in == false

    unless current_user.admin?
      flash[:alert] = t('backend.errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end

  def authenticate_power_user
    return if check_user_signed_in == false

    unless current_user.admin? or current_user.moderator?
      flash[:alert] = t('backend.errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end
end
