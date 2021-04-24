class Subscription < ApplicationRecord
  validates :name,  presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  def price_in_cents
    (price * 100).to_i
  end

end
