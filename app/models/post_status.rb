class PostStatus < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }
  validates :order, numericality: { only_integer: true, greater_than: 0 }

  class << self
    def find_roadmap
      where(show_in_roadmap: true)
      .order(order: :asc)
    end
  end
end
