require 'rails_helper'

RSpec.describe Invitation, type: :model do
  let(:invitation) { FactoryBot.build(:invitation) }

  it 'has a valid factory' do
    expect(invitation).to be_valid
  end
end
