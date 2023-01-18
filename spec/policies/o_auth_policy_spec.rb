require 'rails_helper'

RSpec.describe OAuthPolicy do
  subject { OAuthPolicy.new(user, record) }

  let(:record) { FactoryBot.build_stubbed(:o_auth) }

  context 'being a user' do
    let(:user) { FactoryBot.build(:user) }

    it { should_not permit(:index) }
    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
  end

  context 'being a moderator' do
    let(:user) { FactoryBot.build(:moderator) }

    it { should_not permit(:index) }
    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
  end

  context 'being a admin' do
    let(:user) { FactoryBot.build(:admin) }

    it { should permit(:index) }
    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
  end

  context 'being a owner' do
    let(:user) { FactoryBot.build(:owner) }

    it { should permit(:index) }
    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
  end
end