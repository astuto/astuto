class Current < ActiveSupport::CurrentAttributes
  attribute :tenant

  class MissingCurrentTenant < StandardError; end

  def tenant_or_raise!
    #raise MissingCurrentTenant, "Current tenant is not set" unless tenant

    tenant
  end
end