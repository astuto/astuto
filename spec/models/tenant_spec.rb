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

  it 'may have a valid custom domain' do
    expect(tenant_setting.custom_domain).to be_nil

    tenant_setting.custom_domain = ''
    expect(tenant_setting).to be_valid

    tenant_setting.custom_domain = 'example.com'
    expect(tenant_setting).to be_valid

    tenant_setting.custom_domain = 'subdomain.example.com'
    expect(tenant_setting).to be_valid

    tenant_setting.custom_domain = 'sub.subdomain.example.com'
    expect(tenant_setting).to be_valid

    tenant_setting.custom_domain = 'com'
    expect(tenant_setting).to be_invalid

    tenant_setting.custom_domain = 'https://example.com'
    expect(tenant_setting).to be_invalid

    tenant_setting.custom_domain = 'example.com/sub'
    expect(tenant_setting).to be_invalid

    tenant_setting.custom_domain = 'example.com.'
    expect(tenant_setting).to be_invalid

    tenant_setting.custom_domain = 'example..com'
    expect(tenant_setting).to be_invalid

    tenant_setting.custom_domain = '.example.com'
    expect(tenant_setting).to be_invalid
  end
end
