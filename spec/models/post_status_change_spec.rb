require 'rails_helper'

RSpec.describe PostStatusChange, type: :model do
  let(:post_status_change) { FactoryBot.build(:post_status_change) }
  
  it 'should be valid' do
    expect(post_status_change).to be_valid
  end

  it 'must have a post' do
    post_status_change.post = nil
    expect(post_status_change).to be_invalid
  end

  it 'must have a user' do
    post_status_change.user = nil
    expect(post_status_change).to be_invalid
  end

  it 'can have a null post status' do
    post_status_change.post_status = nil
    expect(post_status_change).to be_valid
  end
end
