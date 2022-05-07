class Board < ApplicationRecord
  include Orderable
  
  has_many :posts, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :description, length: { in: 0..1024 }, allow_nil: true
end
