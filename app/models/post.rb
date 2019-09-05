class Post < ApplicationRecord
  belongs_to :board
  belongs_to :user
  belongs_to :post_status, optional: true

  validates :title, presence: true, length: { in: 4..64 }

  paginates_per 15

  def self.search(s = '')
    s = s || ''
    s = sanitize_sql_like(s)
    where("posts.title ILIKE ? OR posts.description ILIKE ?", "%#{s}%", "%#{s}%")
  end
end
