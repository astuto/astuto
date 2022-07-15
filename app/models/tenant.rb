class Tenant < ApplicationRecord
  has_many :boards
  has_many :post_statuses
  has_many :posts
  has_many :users

  enum brand_display_setting: [
    :name_and_logo,
    :name_only,
    :logo_only,
    :no_name_no_logo
  ]

  enum status: [:active, :pending, :blocked]

  after_initialize :set_default_status, if: :new_record?

  validates :site_name, presence: true
  validates :subdomain, presence: true, uniqueness: true

  def set_default_status
    self.status ||= :pending
  end
end
