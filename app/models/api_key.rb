class ApiKey < ApplicationRecord
  include TenantOwnable

  HMAC_SECRET_KEY = Rails.application.secrets.secret_key_base
  TOKEN_NAMESPACE = 'tkn'

  belongs_to :user

  before_validation :set_common_token_prefix, on: :create
  before_validation :generate_random_token_prefix, on: :create
  before_validation :generate_token, on: :create
  before_validation :generate_token_digest, on: :create

  # The non-hashed token
  attr_accessor :token

  def self.find_by_token!(token)
    find_by!(token_digest: digest(token))
  end

  def self.find_by_token(token)
    find_by(token_digest: digest(token))
  end

  def self.digest(token)
    OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), HMAC_SECRET_KEY, token)
  end

  def token_prefix
    [common_token_prefix, random_token_prefix].join("")
  end

  private

    def set_common_token_prefix
      if user.role == 'owner' || user.role == 'admin'
        user_role = 'admin'
      elsif user.role == 'moderator'
        user_role = 'mod'
      end

      self.common_token_prefix = "#{TOKEN_NAMESPACE}_#{user_role}_"
    end
  
    def generate_random_token_prefix
      self.random_token_prefix = SecureRandom.base58(6)
    end

    def generate_token
      self.token = [common_token_prefix, random_token_prefix, SecureRandom.base58(24)].join("")
    end

    def generate_token_digest
      self.token_digest = self.class.digest(token)
    end
end
