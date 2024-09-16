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

  enum logo_links_to: [
    :root_page,
    :custom_url,
    :nothing
  ]

  enum collapse_boards_in_header: [
    :no_collapse,
    :always_collapse
  ]

  enum email_registration_policy: [
    :all_allowed,
    :none_allowed,
    :custom_domains_allowed
  ]

  enum feedback_approval_policy: [
    :anonymous_require_approval,
    :never_require_approval,
    :always_require_approval,
  ]
end
