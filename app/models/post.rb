class Post < ApplicationRecord
  include TenantOwnable
  
  belongs_to :board
  belongs_to :user
  belongs_to :post_status, optional: true

  has_many :likes, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :user
  has_many :comments, dependent: :destroy
  has_many :post_status_changes, dependent: :destroy

  validates :title, presence: true, length: { in: 4..128 }

  paginates_per Rails.application.posts_per_page

  class << self
    def find_with_post_status_in(post_statuses)
      where(post_status_id: post_statuses.pluck(:id))
    end

    def search_by_name_or_description(s)
      s = s || ''
      s = sanitize_sql_like(s)
      where("posts.title ILIKE ? OR posts.description ILIKE ?", "%#{s}%", "%#{s}%")
    end
  end
end
