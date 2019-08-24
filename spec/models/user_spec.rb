require 'rails_helper'

RSpec.describe User, type: :model do
  
  let(:user) { FactoryBot.build(:user) }
  let(:nilname_user) { FactoryBot.build(:user, full_name: nil) }
  let(:emptyname_user) { FactoryBot.build(:user, full_name: "") }
  let(:short_user) { FactoryBot.build(:user, full_name: "a") }
  let(:long_user) { FactoryBot.build(:user, full_name: "a" * 33) }

  it 'should be valid' do
    expect(user).to be_valid
  end

  it 'creates a user with role "user" by default' do
    expect(User.new.role).to eq("user")
  end

  it 'can have the following roles: "user", "moderator" and "admin"' do
    user = FactoryBot.build(:user)
    moderator = FactoryBot.build(:moderator)
    admin = FactoryBot.build(:admin)

    expect(user.role).to eq("user")
    expect(moderator.role).to eq("moderator")
    expect(admin.role).to eq("admin")

    expect(user).to be_valid
    expect(moderator).to be_valid
    expect(admin).to be_valid
  end

  it 'has a non-nil and non-empty full name' do
    expect(nilname_user).to be_invalid
    expect(emptyname_user).to be_invalid
  end

  it 'has a full name between 2 and 32 characters' do
    expect(short_user).to be_invalid
    expect(long_user).to be_invalid


    short_user.full_name = "a" * 2;
    long_user.full_name = "a" * 32;

    expect(short_user).to be_valid
    expect(long_user).to be_valid
  end

  it 'has an email that must contain a @' do
    invalid_email_user = User.new(full_name: "Valid name", email: "invalid email", password: "password")

    expect(invalid_email_user).to be_invalid
  end

end
