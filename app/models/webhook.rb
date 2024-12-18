class Webhook < ApplicationRecord
  include TenantOwnable

  before_save :encrypt_url
  after_find :decrypt_url
  before_save :encrypt_http_headers
  after_find :decrypt_http_headers

  validates :name, presence: true, uniqueness: { scope: :tenant_id }, length: { maximum: 255 }
  validates :url, presence: true, format: { with: URI::regexp(%w(http https)), message: I18n.t('common.validations.url') }
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

  private

    def encrypt_url
      return if url.nil?

      # Derive a 32-byte key from the secret_key_base
      key = Digest::SHA256.digest(Rails.application.secrets.secret_key_base)
      encryptor = ActiveSupport::MessageEncryptor.new(key)

      self.url = encryptor.encrypt_and_sign(url)
    end

    def decrypt_url
      return if url.nil?

      # Derive a 32-byte key from the secret_key_base
      key = Digest::SHA256.digest(Rails.application.secrets.secret_key_base)
      encryptor = ActiveSupport::MessageEncryptor.new(key)

      self.url = encryptor.decrypt_and_verify(url)
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      errors.add(:url, 'could not be decrypted')
    end

    def encrypt_http_headers
      return if http_headers.nil?

      # Derive a 32-byte key from the secret_key_base
      key = Digest::SHA256.digest(Rails.application.secrets.secret_key_base)
      encryptor = ActiveSupport::MessageEncryptor.new(key)

      self.http_headers = encryptor.encrypt_and_sign(http_headers.to_json)
    end

    def decrypt_http_headers
      return if http_headers.nil?

      # Derive a 32-byte key from the secret_key_base
      key = Digest::SHA256.digest(Rails.application.secrets.secret_key_base)
      encryptor = ActiveSupport::MessageEncryptor.new(key)

      self.http_headers = JSON.parse(encryptor.decrypt_and_verify(http_headers)) if http_headers.present?
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      errors.add(:http_headers, 'could not be decrypted')
    end
end
