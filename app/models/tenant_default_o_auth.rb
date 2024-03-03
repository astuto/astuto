# This is just a table to record whether tenant has
# enabled o_auth or not (and is used only for default
# o_auths, i.e. o_auths with tenant_id = nil, because
# they are available to multiple tenants and so their
# is_enabled column cannot be used)

class TenantDefaultOAuth < ApplicationRecord
  include TenantOwnable

  belongs_to :o_auth, -> { unscope(where: :tenant_id) }
end
