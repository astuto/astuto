class Board < ApplicationRecord
  include TenantOwnable
  include Orderable
  
  has_many :posts, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :tenant_id }
  validates :description, length: { in: 0..1024 }, allow_nil: true
end
