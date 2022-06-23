class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable
  
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  enum role: [:user, :moderator, :admin]
  enum status: [:active, :blocked, :deleted]

  after_initialize :set_default_role, if: :new_record?
  after_initialize :set_default_status, if: :new_record?
  after_initialize :skip_confirmation, if: :new_record?

  validates :full_name, presence: true, length: { in: 2..32 }

  def set_default_role
    self.role ||= :user
  end

  def set_default_status
    self.status ||= :active
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

  def power_user?
    role == 'admin' || role == 'moderator'
  end

  def admin?
    role == 'admin'
  end

  def moderator?
    role == 'moderator'
  end

  def user?
    role == 'user'
  end

  def active?
    status == 'active'
  end

  def blocked?
    status == 'blocked'
  end
end
