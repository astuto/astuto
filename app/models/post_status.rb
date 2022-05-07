class PostStatus < ApplicationRecord
  include Orderable

  has_many :posts, dependent: :nullify

  validates :name, presence: true, uniqueness: true
  validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }

  class << self
    def find_roadmap
      where(show_in_roadmap: true)
      .order(order: :asc)
    end
  end
end
