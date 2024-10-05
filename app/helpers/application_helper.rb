module ApplicationHelper
  def check_user_signed_in
    unless user_signed_in?
      flash[:alert] = t('errors.not_logged_in')
      redirect_to new_user_session_path
      
      return false
    end
  end

  def authenticate_owner
    return if check_user_signed_in == false

    unless current_user.owner?
      flash[:alert] = t('errors.not_enough_privileges')
      redirect_to root_path
      return
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

    unless current_user.moderator?
      flash[:alert] = t('errors.not_enough_privileges')
      redirect_to root_path
      return
    end
  end

  def get_url_for(url_helper, resource: nil, disallow_custom_domain: false, options: {})
    custom_domain = Current.tenant.custom_domain if not disallow_custom_domain and Current.tenant

    if options[:subdomain].blank? && Rails.application.multi_tenancy? && (custom_domain.blank? || disallow_custom_domain)
      options[:subdomain] = Current.tenant.subdomain
    end

    if custom_domain.blank? || disallow_custom_domain
      options[:host] = Rails.application.base_url
    else
      options[:host] = custom_domain
    end

    if Rails.application.base_url.include?('https')
      options[:protocol] = 'https'
    else
      options[:protocol] = 'http'
    end

    resource ? url_helper.call(resource, options) : url_helper.call(options)
  end

  def get_tenant_from_request(request)
    if Rails.application.multi_tenancy?
      request_host = request.headers['HTTP_X_FORWARDED_HOST'] || request.host
      request_host_splitted = request_host.split('.')
      app_host_splitted = URI.parse(Rails.application.base_url).host.split('.')

      if app_host_splitted.join('.') == request_host_splitted.last(app_host_splitted.length).join('.')
        return nil if request.subdomain.blank? or RESERVED_SUBDOMAINS.include?(request.subdomain)

        tenant = Tenant.find_by(subdomain: request.subdomain)
      else
        tenant = Tenant.find_by(custom_domain: request_host)
      end
    else
      tenant = Tenant.first
    end
    
    tenant
  end

  # Redirect to previous page if present; otherwise redirect to root
  def safe_return_to_redirect(url)
    uri = URI.parse(url)
    uri.host.present? && uri.host != request.host ? yield : url
  rescue URI::InvalidURIError
    yield
  end
end
