class Webhook < ApplicationRecord
  include TenantOwnable

  validates :name, presence: true, uniqueness: { scope: :tenant_id }, length: { maximum: 255 }
  validates :url, presence: true
  validates :trigger, presence: true
  validates :http_method, presence: true

  enum trigger: [
    :new_post,
    :new_post_pending_approval,
    :delete_post,
    :post_status_change,
    :new_comment,
    :new_vote,
    :new_user
  ]

  enum http_method: [
    :http_post,
    :http_put,
    :http_patch,
    :http_delete
  ]
end
