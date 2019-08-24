require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:post) { FactoryBot.build(:post) }

  it 'should be valid' do
    expect(post).to be_valid
  end

  it 'has a non-nil and non-empty title' do
    nil_post = FactoryBot.build(:post, title: nil)
    empty_post = FactoryBot.build(:post, title: '')

    expect(nil_post).to be_invalid
    expect(empty_post).to be_invalid
  end

  it 'has a title between 4 and 64 characters' do
    too_short_post = FactoryBot.build(:post, title: 'a' * 3)
    short_post = FactoryBot.build(:post, title: 'a' * 4)
    long_post = FactoryBot.build(:post, title: 'a' * 64)
    too_long_post = FactoryBot.build(:post, title: 'a' * 65)

    expect(too_short_post).to be_invalid
    expect(short_post).to be_valid
    expect(long_post).to be_valid
    expect(too_long_post).to be_invalid
  end

  it 'has a description that can be nil or empty' do
    nil_description_post = FactoryBot.build(:post, description: nil)
    empty_description_post = FactoryBot.build(:post, description: '')

    expect(nil_description_post).to be_valid
    expect(empty_description_post).to be_valid
  end

  it 'has a reference to a post status that can be nil' do
    no_status_post = FactoryBot.build(:post, post_status_id: nil)
    
    expect(no_status_post).to be_valid
  end

  it 'has a reference to a user than cannot be nil' do
    no_user_post = FactoryBot.build(:post, user_id: nil)

    expect(no_user_post).to be_invalid
  end

  it 'has a reference to a board than cannot be nil' do
    no_board_post = FactoryBot.build(:post, board_id: nil)

    expect(no_board_post).to be_invalid
  end
end
