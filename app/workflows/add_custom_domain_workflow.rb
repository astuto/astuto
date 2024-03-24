class AddCustomDomainWorkflow
  include HTTParty

  attr_accessor :new_custom_domain, :current_custom_domain

  def initialize(new_custom_domain: "", current_custom_domain: "")
    @new_custom_domain = new_custom_domain
    @current_custom_domain = current_custom_domain
  end

  def make_request(method, domain)
    return unless method == "POST" || method == "DELETE"

    HTTParty.send(
      method.downcase,
      ENV["ASTUTO_CNAME_API_URL"],
      headers: {
        "api_key" => ENV["ASTUTO_CNAME_API_KEY"],
        "Accept" => "application/json",
      },
      query: { "domain" => domain.downcase }
    )
  end

  def run
    return true unless Rails.application.multi_tenancy?
    return true if @new_custom_domain == @current_custom_domain
    return true if Tenant.exists?(custom_domain: @new_custom_domain)
    
    begin
      # Add new custom domain...
      if @new_custom_domain.present?
        response = make_request("POST", @new_custom_domain)

        return false unless response.success?
      end

      # ... and remove the current one
      if @current_custom_domain.present?
        make_request("DELETE", @current_custom_domain)
      end

      return true
    rescue => e
      return false
    end
  end
end