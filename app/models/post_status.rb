class PostStatus < ApplicationRecord
  has_many :posts, dependent: :nullify

  after_initialize :set_random_color, :set_order_to_last
  after_destroy :ensure_coherent_order

  validates :name, presence: true, uniqueness: true
  validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }
  validates :order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  class << self
    def find_roadmap
      where(show_in_roadmap: true)
      .order(order: :asc)
    end
  end

  def set_random_color
    return unless new_record?
    return unless color.nil?

    self.color = '#' + Random.bytes(3).unpack1('H*')
  end

  def set_order_to_last
    return unless new_record?
    return unless order.nil?
    
    order_last = PostStatus.maximum(:order) || -1
    self.order = order_last + 1
  end

  def ensure_coherent_order
    EnsureCoherentOrderingWorkflow.new(
      entity_classname: PostStatus,
      column_name: 'order'
    ).run
  end
end
