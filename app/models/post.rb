class Post < ApplicationRecord
  include TenantOwnable
  extend FriendlyId
  
  belongs_to :board
  belongs_to :user, optional: true
  belongs_to :post_status, optional: true

  has_many :likes, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :user
  has_many :comments, dependent: :destroy
  has_many :post_status_changes, dependent: :destroy

  enum approval_status: [
    :approved,
    :pending,
    :rejected
  ] 

  validates :title, presence: true, length: { in: 4..128 }

  paginates_per Rails.application.posts_per_page

  friendly_id :title, use: :scoped, scope: :tenant_id

  class << self
    def find_with_post_status_in(post_statuses)
      where(post_status_id: post_statuses.pluck(:id))
    end

    def search_by_name_or_description(s)
      s = s || ''
      s = sanitize_sql_like(s)
      where("posts.title ILIKE ? OR posts.description ILIKE ?", "%#{s}%", "%#{s}%")
    end

    def order_by(sort_by)
      case sort_by
      when 'newest'
        order(created_at: :desc)
      when 'trending'
        order(hotness: :desc)
      when 'most_voted'
        order(likes_count: :desc)
      when 'oldest'
        order(created_at: :asc)
      else
        order(created_at: :desc)
      end
    end
  end
end
