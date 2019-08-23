require 'rails_helper'

RSpec.describe User, type: :model do
  
  let(:user) { FactoryBot.build(:user) }
  let(:nilname_user) { FactoryBot.build(:user, full_name: nil) }
  let(:emptyname_user) { FactoryBot.build(:user, full_name: "") }
  let(:short_user) { FactoryBot.build(:user, full_name: "a") }
  let(:long_user) { FactoryBot.build(:user, full_name: "a" * 33) }

  it 'creates a user with role "user" by default' do
    expect(user.role).to eq('user')
  end

  it 'has a non-nil and non-empty full name' do
    expect(nilname_user.valid?).to be_falsy
    expect(emptyname_user.valid?).to be_falsy
  end

  it 'has a full name between 2 and 32 characters' do
    expect(short_user.valid?).to be_falsy
    expect(long_user.valid?).to be_falsy


    short_user.full_name = "a" * 2;
    long_user.full_name = "a" * 32;

    expect(short_user.valid?).to be_truthy
    expect(long_user.valid?).to be_truthy
  end

  it 'has an email that must contain a @' do
    invalid_email_user = User.new(full_name: "Valid name", email: "invalid email", password: "password")

    expect(invalid_email_user.valid?).to be_falsy
    expect(user.valid?).to be_truthy
  end

end
