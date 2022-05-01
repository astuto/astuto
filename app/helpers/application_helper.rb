module ApplicationHelper
  def authenticate_admin
    unless user_signed_in?
      flash[:alert] = 'You must be logged in to access this page.'
      redirect_to new_user_session_path
      return
    end

    unless current_user.moderator? || current_user.admin?
      flash[:alert] = 'You do not have the privilegies to access this page.'
      redirect_to root_path
      return
    end
  end
end
