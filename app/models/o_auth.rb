class OAuth < ApplicationRecord
  include TenantOwnable
  include ApplicationHelper
  include Rails.application.routes.url_helpers

  attr_accessor :state

  validates :name, presence: true, uniqueness: { scope: :tenant_id }
  validates :is_enabled, inclusion: { in: [true, false] }
  validates :client_id, presence: true
  validates :client_secret, presence: true
  validates :authorize_url, presence: true
  validates :token_url, presence: true
  validates :profile_url, presence: true
  validates :scope, presence: true
  validates :json_user_email_path, presence: true

  def callback_url
    add_subdomain_to(method(:o_auth_callback_url), id)
  end

  def authorize_url_with_query_params
    "#{authorize_url}?"\
    "response_type=code&"\
    "client_id=#{client_id}&"\
    "redirect_uri=#{callback_url()}&"\
    "scope=#{scope}&"\
    "state=#{state}"
  end
end
