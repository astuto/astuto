require 'rails_helper'

RSpec.describe OAuth, type: :model do
  let(:o_auth) { FactoryBot.create(:o_auth) }

  it 'should be valid' do
    expect(o_auth).to be_valid
  end

  it 'has a non-nil unique name' do
    o_auth2 = FactoryBot.build_stubbed(:o_auth, name: o_auth.name)

    expect(o_auth2).to be_invalid
  end

  it 'is disabled by default' do
    o_auth = OAuth.new

    expect(o_auth.is_enabled).to eq(false)
  end

  it 'has a boolean enabled status' do
    o_auth = FactoryBot.build_stubbed(:o_auth, is_enabled: nil)
    expect(o_auth).to be_invalid

    o_auth = FactoryBot.build_stubbed(:o_auth, is_enabled: true)
    expect(o_auth).to be_valid

    o_auth = FactoryBot.build_stubbed(:o_auth, is_enabled: false)
    expect(o_auth).to be_valid
  end

  it 'has non-nil client credentials' do
    o_auth = FactoryBot.build_stubbed(:o_auth, client_id: nil)
    expect(o_auth).to be_invalid

    o_auth = FactoryBot.build_stubbed(:o_auth, client_secret: nil)
    expect(o_auth).to be_invalid
  end

  it 'has non-nil urls' do
    o_auth = FactoryBot.build_stubbed(:o_auth, authorize_url: nil)
    expect(o_auth).to be_invalid

    o_auth = FactoryBot.build_stubbed(:o_auth, token_url: nil)
    expect(o_auth).to be_invalid

    o_auth = FactoryBot.build_stubbed(:o_auth, profile_url: nil)
    expect(o_auth).to be_invalid
  end

  it 'has a non-nil scope' do
    o_auth = FactoryBot.build_stubbed(:o_auth, scope: nil)
    expect(o_auth).to be_invalid
  end

  it 'has a non-nil json user email path and a nullable name path' do
    o_auth = FactoryBot.build_stubbed(:o_auth, json_user_email_path: nil)
    expect(o_auth).to be_invalid

    o_auth = FactoryBot.build_stubbed(:o_auth, json_user_name_path: nil)
    expect(o_auth).to be_valid
  end
end
