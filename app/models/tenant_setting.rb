class TenantSetting < ApplicationRecord
  include TenantOwnable
  
  belongs_to :tenant

  enum brand_display: [
    :name_and_logo,
    :name_only,
    :logo_only,
    :no_name_no_logo
  ]
end
