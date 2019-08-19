require 'rails_helper'

RSpec.describe User, type: :model do
  
  let(:user) { User.new(email: 'example@example.com', password: 'password') }

  it 'creates a user with role "user" by default' do
    expect(user.role).to eq('user')
  end

end
