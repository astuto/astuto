module ApplicationHelper
  def authenticate_admin
    unless user_signed_in?
      flash[:alert] = I18n.t('controller.errors.not_logged_in')
      redirect_to new_user_session_path
      return
    end

    unless current_user.moderator? || current_user.admin?
      flash[:alert] = I18n.t('controller.errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end
end
