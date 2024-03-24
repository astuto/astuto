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

  def get_tenant_from_request(request)
    if Rails.application.multi_tenancy?
      request_host_splitted = request.host.split('.')
      app_host_splitted = URI.parse(Rails.application.base_url).host.split('.')

      if app_host_splitted.join('.') == request_host_splitted.last(app_host_splitted.length).join('.')
        return if request.subdomain.blank? or RESERVED_SUBDOMAINS.include?(request.subdomain)

        tenant = Tenant.find_by(subdomain: request.subdomain)
      else
        tenant = Tenant.find_by(custom_domain: request.host)
      end
    else
      tenant = Tenant.first
    end
    
    tenant
  end
end
