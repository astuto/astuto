class TenantSetting < ApplicationRecord
  include TenantOwnable
  
  belongs_to :tenant

  validates :custom_css, length: { maximum: 32000 }

  enum brand_display: [
    :name_and_logo,
    :name_only,
    :logo_only,
    :no_name_no_logo
  ]

  enum collapse_boards_in_header: [
    :no_collapse,
    :always_collapse
  ]
end
