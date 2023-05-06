require 'rails_helper'

RSpec.describe BoardPolicy do
  subject { BoardPolicy.new(user, record) }

  let(:record) { FactoryBot.build_stubbed(:board) }

  context 'being a user' do
    let(:user) { FactoryBot.build_stubbed(:user) }

    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
    it { should_not permit(:update_order) }
  end

  context 'being a moderator' do
    let(:user) { FactoryBot.build_stubbed(:moderator) }

    it { should_not permit(:create) }
    it { should_not permit(:update) }
    it { should_not permit(:destroy) }
    it { should_not permit(:update_order) }
  end

  context 'being a admin' do
    let(:user) { FactoryBot.build_stubbed(:admin) }

    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
    it { should permit(:update_order) }
  end

  context 'being a owner' do
    let(:user) { FactoryBot.build_stubbed(:owner) }

    it { should permit(:create) }
    it { should permit(:update) }
    it { should permit(:destroy) }
    it { should permit(:update_order) }
  end
end