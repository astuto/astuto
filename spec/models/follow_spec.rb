require 'rails_helper'

RSpec.describe Follow, type: :model do
  let(:follow) { FactoryBot.build(:follow) }

  it 'is valid' do
    expect(follow).to be_valid
  end

  it 'must have a user_id' do
    follow.user = nil
    expect(follow).to be_invalid
  end

  it 'must have a post_id' do
    follow.post = nil
    expect(follow).to be_invalid
  end

  it 'must be unique on user and post' do
    follow
    f = Follow.new(user_id: follow.user_id, post_id: follow.post_id)

    expect(f).to be_invalid
  end
end
