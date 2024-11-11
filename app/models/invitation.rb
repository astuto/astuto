class Invitation < ApplicationRecord
  include TenantOwnable

  belongs_to :tenant

  def expired?
    updated_at <= 3.months.ago
  end
end
