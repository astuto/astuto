require 'rails_helper'

RSpec.describe TenantSetting, type: :model do
  let(:tenant_setting) { FactoryBot.build(:tenant_setting) }

  it 'should be valid' do
    expect(tenant_setting).to be_valid
  end

  it 'has a setting brand_display' do
    expect(tenant_setting.brand_display).to eq('name_and_logo')

    tenant_setting.brand_display = 'name_only'
    expect(tenant_setting).to be_valid

    tenant_setting.brand_display = 'logo_only'
    expect(tenant_setting).to be_valid

    tenant_setting.brand_display = 'no_name_no_logo'
    expect(tenant_setting).to be_valid
  end
end
