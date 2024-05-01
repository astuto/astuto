class Tenant < ApplicationRecord
  has_one :tenant_setting, dependent: :destroy
  has_one :tenant_billing, dependent: :destroy
  has_many :boards, dependent: :destroy
  has_many :post_statuses, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :users, dependent: :destroy

  has_many :o_auths, dependent: :destroy
  # used to enable/disable a default oauth for a specific tenant
  has_many :tenant_default_o_auths, dependent: :destroy
  # used to query all globally enabled default oauths that are also enabled by the specific tenant
  has_many :default_o_auths, -> { where tenant_id: nil, is_enabled: true }, through: :tenant_default_o_auths, source: :o_auth

  enum status: [:active, :pending, :blocked]

  after_initialize :set_default_status, if: :new_record?
  before_save :downcase_subdomain

  validates :site_name, presence: true
  validates :subdomain, presence: true, uniqueness: true
  validates :locale, inclusion: { in: I18n.available_locales.map(&:to_s) }
  validates :custom_domain, format: { with: /\A[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\z/ }, uniqueness: true, allow_blank: true, allow_nil: true

  accepts_nested_attributes_for :tenant_setting, update_only: true

  def set_default_status
    self.status ||= :pending
  end

  def downcase_subdomain
    self.subdomain = self.subdomain.downcase
  end

  def owner
    users.find_by(role: 'owner')
  end
end
