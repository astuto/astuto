class Invitation < ApplicationRecord
  belongs_to :tenant

  def expired?
    created_at < 3.months.ago
  end
end
