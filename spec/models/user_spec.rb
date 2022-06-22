require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.build(:user) }
  let(:moderator) { FactoryBot.build(:moderator) }
  let(:admin) { FactoryBot.build(:admin) }

  it 'should be valid' do
    expect(user).to be_valid
  end

  it 'has role "user" by default' do
    expect(User.new.role).to eq('user')
  end

  it 'can have the following roles: "user", "moderator" and "admin"' do
    expect(user.role).to eq('user')
    expect(moderator.role).to eq('moderator')
    expect(admin.role).to eq('admin')

    expect(user).to be_valid
    expect(moderator).to be_valid
    expect(admin).to be_valid
  end

  it 'has status "active" by default' do
    expect(User.new.status).to eq('active')
  end

  it 'can have the following statuses: "active", "blocked" and "deleted"' do
    active = user
    blocked = FactoryBot.build(:blocked)
    deleted = FactoryBot.build(:deleted)

    expect(user.status).to eq('active')
    expect(blocked.status).to eq('blocked')
    expect(deleted.status).to eq('deleted')

    expect(user).to be_valid
    expect(blocked).to be_valid
    expect(deleted).to be_valid
  end

  it 'has a non-nil and non-empty full name' do
    nil_name_user = FactoryBot.build(:user, full_name: nil)
    empty_name_user = FactoryBot.build(:user, full_name: '')

    expect(nil_name_user).to be_invalid
    expect(empty_name_user).to be_invalid
  end

  it 'has a full name between 2 and 32 characters' do
    too_short_user = FactoryBot.build(:user, full_name: 'a' * 1)
    short_user = FactoryBot.build(:user, full_name: 'a' * 2)
    long_user = FactoryBot.build(:user, full_name: 'a' * 32)
    too_long_user = FactoryBot.build(:user, full_name: 'a' * 33)
    
    expect(too_short_user).to be_invalid
    expect(short_user).to be_valid
    expect(long_user).to be_valid
    expect(too_long_user).to be_invalid
  end

  it 'has an email that must contain a @' do
    invalid_email_user = FactoryBot.build(:user, email: 'invalid.email')

    expect(invalid_email_user).to be_invalid
  end

  it 'knows if it is a power user' do
    expect(user).not_to be_a_power_user
    expect(moderator).to be_a_power_user
    expect(admin).to be_a_power_user
  end

  it 'knows if it is active or blocked' do
    expect(user).to be_active

    blocked = FactoryBot.build(:blocked)
    expect(blocked).to be_blocked
  end
end
