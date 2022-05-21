class PostStatusChange < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :post_status, optional: true
end
