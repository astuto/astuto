class TenantSetting < ApplicationRecord
  include TenantOwnable
  
  belongs_to :tenant

  validates :custom_domain, format: { with: /\A[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\z/ }, allow_blank: true
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
