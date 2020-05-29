
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, 
         :omniauthable, omniauth_providers: %i[scs]
  
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  enum role: [:user, :moderator, :admin]
  after_initialize :set_default_role, if: :new_record?
  after_initialize :skip_confirmation, if: :new_record?

  validates :full_name, presence: true, length: { in: 2..32 }

  attr_accessor :skip_password_validation # virtual attribute to skip password validation while saving

  def set_default_role
    self.role ||= :user
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

  class << self
    def from_omniauth(auth)
      user = User.find_by(provider: :scs, uid: auth['info']['id']) || User.new(uid: auth['info']['id'])
      role = auth['extra']['raw_info']['type'] == 'manager' ? :moderator : :user
      user.assign_attributes(
        provider: :scs,
        email: auth['info']['email'],
        full_name: auth['info']['name'],
        role: role
        # ext_auth_info: auth.to_json
        )
      user.skip_password_validation = true
      user.save!
      binding.pry
      user
    end
  end

  protected

  def password_required?
    return false if skip_password_validation
    super
  end
end
