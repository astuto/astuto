# A TenantOwnable model belongs to a tenant
# A TenantOwnable model must have a tenant_id column

module TenantOwnable
  extend ActiveSupport::Concern
  
  included do
    # Tenant is actually not optional, but we not do want
    # to generate a SELECT query to verify the tenant is
    # there every time. We get this protection for free
    # through database FK constraints
    belongs_to :tenant, optional: true
    
    default_scope { where(tenant: Current.tenant_or_raise!) }
  end
end