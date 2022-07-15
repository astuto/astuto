class Current < ActiveSupport::CurrentAttributes
  attribute :tenant

  class MissingCurrentTenant < StandardError; end
  class CurrentTenantNotActive < StandardError; end

  def tenant_or_raise!
    raise MissingCurrentTenant, "Current tenant is not set" unless tenant
    raise CurrentTenantBlocked, "Current tenant is blocked" unless tenant.status != "blocked"

    tenant
  end
end