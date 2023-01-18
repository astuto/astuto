require 'rails_helper'

RSpec.describe TenantPolicy do
  subject { TenantPolicy.new(user, record) }

  let(:record) { FactoryBot.build_stubbed(:tenant) }
  let(:user) { nil }
  
  it { should permit(:create) }

  context 'being a user' do
    let(:user) { FactoryBot.build(:user, tenant_id: record.id) }

    it { should_not permit(:update) }
  end

  context 'being a moderator' do
    let(:user) { FactoryBot.build(:moderator, tenant_id: record.id) }

    it { should_not permit(:update) }
  end

  context 'being a admin' do
    let(:user) { FactoryBot.build(:admin, tenant_id: record.id) }

    it { should permit(:update) }

    context 'having a tenant_id different from the tenant being updated' do
      let(:user) { FactoryBot.build(:admin, tenant_id: record.id + 1) }

      it { should_not permit(:update) }
    end
  end
end