# An Orderable model is a model with an 'order' column

# 1) An new Orderable entity gets, by default, an
# 'order' equal to current maximum order + 1
# 2) When an Orderable entity gets deleted
# all other entities are reordered to be consistent

# Note: update is not handled by the Orderable concern,
# but rather in the entity controller action "update_order"

module Orderable
  extend ActiveSupport::Concern

  included do
    after_initialize :set_order_to_last
    after_destroy :ensure_coherent_order

    validates :order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

    def set_order_to_last
      return unless new_record?
      return unless order.nil?

      order_last = self.class.maximum(:order) || -1
      self.order = order_last + 1
    end

    def ensure_coherent_order
      EnsureCoherentOrderingWorkflow.new(
        entity_classname: self.class,
        column_name: 'order'
      ).run
    end
  end
end