class OAuth < ApplicationRecord
  include TenantOwnable
  include ApplicationHelper
  include Rails.application.routes.url_helpers

  has_many :tenant_default_o_auths, dependent: :destroy

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

  def is_default?
    tenant_id == nil
  end

  def callback_url
    # Default OAuths are available to all tenants
    # but must have a single callback url:
    # for this reason, we don't preprend tenant subdomain
    # but rather use the "login" subdomain
    if self.is_default?
      o_auth_callback_url(id, host: Rails.application.base_url, subdomain: "login")
    else
      add_subdomain_to(method(:o_auth_callback_url), id)
    end
  end

  def authorize_url_with_query_params
    "#{authorize_url}?"\
    "response_type=code&"\
    "client_id=#{client_id}&"\
    "redirect_uri=#{callback_url()}&"\
    "scope=#{scope}&"\
    "state=#{state}"
  end

  def default_o_auth_is_enabled
    is_default? and tenant_default_o_auths.exists?
  end

  class << self
    # returns all tenant-specific o_auths plus all default o_auths that are enabled site-wide
    def include_all_defaults
      unscoped.where(tenant_id: nil, is_enabled: true).or(where(tenant_id: Current.tenant))
    end

    # returns all tenant-specific o_auths plus all default o_auths that are enabled both site-wide and for the current tenant
    def include_defaults
      unscoped.left_outer_joins(:tenant_default_o_auths).where(tenant_default_o_auths: { tenant_id: Current.tenant }, is_enabled: true).or(where(tenant_id: Current.tenant))
    end

    # returns all default o_auths that are enabled site-wide
    def include_only_defaults
      unscoped.where(tenant_id: nil, is_enabled: true)
    end
  end
end
