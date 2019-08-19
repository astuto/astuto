class User < ApplicationRecord
  enum role: [:user, :moderator, :admin]
  after_initialize :set_default_role, if: :new_record?

  validates :full_name, presence: true

  def set_default_role
    self.role ||= :user
  end

  def gravatar_url
    gravatar_id = Digest::MD5::hexdigest(email.downcase)
    "https://secure.gravatar.com/avatar/#{gravatar_id}"
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable
end
