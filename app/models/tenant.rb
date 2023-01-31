class Tenant < ApplicationRecord
  has_one :tenant_setting
  has_many :boards
  has_many :o_auths
  has_many :post_statuses
  has_many :posts
  has_many :users

  enum status: [:active, :pending, :blocked]

  after_initialize :set_default_status, if: :new_record?
  after_create :create_default_tenant_setting

  validates :site_name, presence: true
  validates :subdomain, presence: true, uniqueness: true

  def set_default_status
    self.status ||= :pending
  end

  def create_default_tenant_setting
    self.create_tenant_setting!
  end
end
