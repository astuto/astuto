require 'rails_helper'

RSpec.describe ApiKey, type: :model do
  it 'automatically digest token upon creation' do
    api_key = FactoryBot.build(:api_key)

    expect(api_key.token_digest).to eq(nil)
    
    api_key.save

    expect(api_key.token_digest).not_to eq(nil)
  end
end
