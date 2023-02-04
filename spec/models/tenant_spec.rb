require 'rails_helper'

RSpec.describe Tenant, type: :model do
  let(:tenant) { FactoryBot.build(:tenant) }

  it 'should be valid' do
    expect(tenant).to be_valid
  end

  it 'has status "pending" by default' do
    expect(Tenant.new.status).to eq('pending')
  end

  it 'has a status of "active", "pending" or "blocked"' do
    tenant.status = 'active'
    expect(tenant).to be_valid

    tenant.status = 'pending'
    expect(tenant).to be_valid

    tenant.status = 'blocked'
    expect(tenant).to be_valid
  end

  it 'has a non-empty site name' do
    tenant.site_name = ''
    expect(tenant).to be_invalid
  end

  it 'has a non-empty and unique subdomain' do
    tenant.subdomain = ''
    expect(tenant).to be_invalid

    tenant2 = FactoryBot.create(:tenant)
    tenant.subdomain = tenant2.subdomain
    expect(tenant).to be_invalid
  end
end
