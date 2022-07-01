class PostStatusChange < ApplicationRecord
  include TenantOwnable
  
  belongs_to :user
  belongs_to :post
  belongs_to :post_status, optional: true
end
