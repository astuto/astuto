class Board < ApplicationRecord
  include TenantOwnable
  include Orderable
  extend FriendlyId
  
  has_many :posts, dependent: :destroy

  before_save :sanitize_slug

  validates :name, presence: true, uniqueness: { scope: :tenant_id }
  validates :description, length: { in: 0..1024 }, allow_nil: true

  friendly_id :name, use: :scoped, scope: :tenant_id

  def sanitize_slug
    self.slug = self.slug.parameterize
    self.slug = nil if self.slug.blank? # friendly_id will generate a slug if it's nil
  end
end
