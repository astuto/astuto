class PostStatus < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }
end
