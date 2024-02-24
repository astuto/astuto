class Tenant < ApplicationRecord
  has_one :tenant_setting, dependent: :destroy
  has_many :boards, dependent: :destroy
  has_many :o_auths, dependent: :destroy
  has_many :post_statuses, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :users, dependent: :destroy

  enum status: [:active, :pending, :blocked]

  after_initialize :set_default_status, if: :new_record?
  before_save :downcase_subdomain

  validates :site_name, presence: true
  validates :subdomain, presence: true, uniqueness: true

  accepts_nested_attributes_for :tenant_setting, update_only: true

  def set_default_status
    self.status ||= :pending
  end

  def downcase_subdomain
    self.subdomain = self.subdomain.downcase
  end
end
