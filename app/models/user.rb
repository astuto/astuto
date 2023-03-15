class User < ApplicationRecord
  include TenantOwnable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable
    
  validates_confirmation_of :password
  
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  enum role: [:user, :moderator, :admin, :owner]
  enum status: [:active, :blocked, :deleted]

  after_initialize :set_default_role, if: :new_record?
  after_initialize :set_default_status, if: :new_record?

  before_save :skip_confirmation

  validates :full_name, presence: true, length: { in: 2..32 }
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
    end
  end

  def skip_confirmation
    return if Rails.application.email_confirmation?
    skip_confirmation!
    skip_confirmation_notification!
    skip_reconfirmation!
  end

  def gravatar_url
    gravatar_id = Digest::MD5::hexdigest(email.downcase)
    "https://secure.gravatar.com/avatar/#{gravatar_id}"
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
end
