class PostStatus < ApplicationRecord
  include TenantOwnable
  include Orderable

  has_many :posts, dependent: :nullify
  has_many :post_status_changes, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :tenant_id }
  validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }

  class << self
    def find_roadmap
      where(show_in_roadmap: true)
      .order(order: :asc)
    end
  end
end
