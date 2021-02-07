class Board < ApplicationRecord
  has_many :posts, dependent: :destroy
  
  after_initialize :set_order_to_last

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true
  validates :description, length: { in: 0..1024 }, allow_nil: true

  def set_order_to_last
    return unless new_record?
    return unless order.nil?
    
    order_last = Board.maximum(:order) || 0
    self.order = order_last + 1
  end

  def name=(value)
    if self.slug.blank?
      self.slug = value.to_s.parameterize
    end
    super(value)
  end

  def to_param
    self.slug
  end
end
