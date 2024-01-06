class PostSetting < ApplicationRecord
  include TenantOwnable
  
  has_many :posts
end
