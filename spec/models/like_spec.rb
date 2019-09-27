require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:like) { FactoryBot.build(:like) }

  it 'is valid' do
    expect(like).to be_valid
  end

  it 'must have a user_id' do
    like.user = nil
    expect(like).to be_invalid
  end

  it 'must have a post_id' do
    like.post = nil
    expect(like).to be_invalid
  end
end
