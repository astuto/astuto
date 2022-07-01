class Tenant < ApplicationRecord
  has_many :boards
  has_many :post_statuses
  has_many :posts
  has_many :users

  validates :site_name, presence: true
  validates :subdomain, presence: true, uniqueness: true
end
