require 'rails_helper'

RSpec.describe TenantDefaultOAuth, type: :model do
  let(:tenant_default_o_auth) { FactoryBot.build(:tenant_default_o_auth) }

  it 'is valid' do
    expect(tenant_default_o_auth).to be_valid
  end

  it 'must have a o_auth_id' do
    tenant_default_o_auth.o_auth = nil
    expect(tenant_default_o_auth).to be_invalid
  end
end
