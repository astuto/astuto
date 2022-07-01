class Follow < ApplicationRecord
  include TenantOwnable
  
  belongs_to :user
  belongs_to :post

  validates :user_id, uniqueness: { scope: :post_id }
end
