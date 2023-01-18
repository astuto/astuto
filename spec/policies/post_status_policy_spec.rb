require 'rails_helper'

RSpec.describe PostStatusPolicy do
  subject { PostStatusPolicy.new(user, record) }

  let(:record) { FactoryBot.build_stubbed(:post_status) }

  context 'being a user' do
    let(:user) { FactoryBot.build(:user) }

    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
    it { should_not permit(:update_order) }
  end

  context 'being a moderator' do
    let(:user) { FactoryBot.build(:moderator) }

    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
    it { should_not permit(:update_order) }
  end

  context 'being a admin' do
    let(:user) { FactoryBot.build(:admin) }

    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
    it { should permit(:update_order) }
  end

  context 'being a owner' do
    let(:user) { FactoryBot.build(:owner) }

    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
    it { should permit(:update_order) }
  end
end