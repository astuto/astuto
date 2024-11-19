class User < ApplicationRecord
  include TenantOwnable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable,
         :trackable
    
  validates_confirmation_of :password
  
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_one :api_key, dependent: :destroy

  enum role: [:user, :moderator, :admin, :owner]
  enum status: [:active, :blocked, :deleted]

  enum recap_notification_frequency: [:never, :daily, :weekly, :monthly]

  after_initialize :set_default_role, if: :new_record?
  after_initialize :set_default_status, if: :new_record?

  validates :full_name, presence: true, length: { in: 2..64 }
  validates :email,
    presence: true,
    uniqueness: { scope: :tenant_id, case_sensitive: false },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, allow_blank: true, length: { in: 6..128 }
  validates :password, presence: true, on: :create

  def set_default_role
    self.role ||= :user
  end

  def set_default_status
    self.status ||= :active
  end

  def active_for_authentication?
    super && active?
  end

  def inactive_message
    active? ? super : I18n.t('errors.user_blocked_or_deleted')
  end

  # Override Devise::Confirmable#after_confirmation
  # Used to change tenant status from pending to active on owner email confirmation
  def after_confirmation
    tenant = self.tenant

    if tenant.status == "pending" and tenant.users.count == 1
      tenant.status = "active"
      tenant.save

      CreateStripeCustomer.new().run
      TenantMailer.trial_start(tenant: tenant).deliver_later
    end
  end

  def skip_confirmation
    skip_confirmation!
    skip_confirmation_notification!
    skip_reconfirmation!
  end

  def gravatar_url
    gravatar_id = Digest::MD5::hexdigest(email.downcase)
    "https://secure.gravatar.com/avatar/#{gravatar_id}"
  end

  def full_name_or_email
    if full_name.present? && full_name != I18n.t('defaults.user_full_name') && full_name != I18n.t('defaults.user_full_name', locale: 'en')
      full_name
    else
      email
    end
  end

  def owner?
    role == 'owner'
  end

  def admin?
    owner? || role == 'admin'
  end

  def moderator?
    admin? || role == 'moderator'
  end

  def active?
    status == 'active'
  end

  def blocked?
    status == 'blocked'
  end

  def generate_oauth_token
    self.oauth_token = SecureRandom.urlsafe_base64
    self.save!
    oauth_token
  end

  def invalidate_oauth_token
    self.oauth_token = nil
    self.save!
  end
end
