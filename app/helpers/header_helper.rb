module HeaderHelper
  def get_url_for_logo
    if Current.tenant.tenant_setting.logo_links_to == "root_page"
      @header_full_urls ? get_url_for(method(:root_url)) : root_path
    elsif Current.tenant.tenant_setting.logo_links_to == "custom_url"
      Current.tenant.tenant_setting.logo_custom_url
    else
      nil
    end
  end
end