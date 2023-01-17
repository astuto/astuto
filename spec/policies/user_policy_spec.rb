require 'rails_helper'

RSpec.describe UserPolicy do
  subject { UserPolicy.new(user, record) }

  # context 'being a visitor' do
  #   let(:user) { nil }
  #   let(:record) { FactoryBot.build(:user) }

  #   it { should_not permit(:index) }
  #   it { should_not permit(:edit) }
  # end

  context 'being a user' do
    let(:user) { FactoryBot.build(:user) }
    let(:record) { FactoryBot.build(:user) }

    it { should_not permit(:index) }
    it { should_not permit(:edit) }
  end

  context 'being a moderator' do
    let(:user) { FactoryBot.build(:moderator) }
    let(:record) { User }

    it { should permit(:index) }

    context 'acting on a user of role "user"' do
      let(:record) { FactoryBot.build(:user) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "moderator"' do
      let(:record) { FactoryBot.build(:moderator) }

      it { should_not permit(:edit) }
    end

    context 'acting on a user of role "admin"' do
      let(:record) { FactoryBot.build(:admin) }

      it { should_not permit(:edit) }
    end

    context 'acting on a user of role "owner"' do
      let(:record) { FactoryBot.build(:owner) }

      it { should_not permit(:edit) }
    end
  end

  context 'being an admin' do
    let(:user) { FactoryBot.build(:admin) }
    let(:record) { User }

    it { should permit(:index) }

    context 'acting on a user of role "user"' do
      let(:record) { FactoryBot.build(:user) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "moderator"' do
      let(:record) { FactoryBot.build(:moderator) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "admin"' do
      let(:record) { FactoryBot.build(:admin) }

      it { should_not permit(:edit) }
    end

    context 'acting on a user of role "owner"' do
      let(:record) { FactoryBot.build(:owner) }

      it { should_not permit(:edit) }
    end
  end

  context 'being a owner' do
    let(:user) { FactoryBot.build(:owner) }
    let(:record) { User }

    it { should permit(:index) }

    context 'acting on a user of role "user"' do
      let(:record) { FactoryBot.build(:user) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "moderator"' do
      let(:record) { FactoryBot.build(:moderator) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "admin"' do
      let(:record) { FactoryBot.build(:admin) }

      it { should permit(:edit) }
    end

    context 'acting on a user of role "owner"' do
      let(:record) { FactoryBot.build(:owner) }

      it { should permit(:edit) }
    end
  end
end