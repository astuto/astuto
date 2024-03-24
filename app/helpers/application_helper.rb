module ApplicationHelper
  def check_user_signed_in
    unless user_signed_in?
      flash[:alert] = t('errors.not_logged_in')
      redirect_to new_user_session_path
      
      return false
    end
  end

  def authenticate_admin
    return if check_user_signed_in == false

    unless current_user.admin?
      flash[:alert] = t('errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end

  def authenticate_moderator
    return if check_user_signed_in == false

    unless  current_user.moderator?
      flash[:alert] = t('errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end

  def add_subdomain_to(url_helper, resource=nil, options={})
    options[:subdomain] = Current.tenant_or_raise!.subdomain if Rails.application.multi_tenancy?
    options[:host] = Rails.application.base_url

    resource ? url_helper.call(resource, options) : url_helper.call(options)
  end
end
