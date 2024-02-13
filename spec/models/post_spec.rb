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

  it 'has a title between 4 and 128 characters' do
    too_short_post = FactoryBot.build(:post, title: 'a' * 3)
    short_post = FactoryBot.build(:post, title: 'a' * 4)
    long_post = FactoryBot.build(:post, title: 'a' * 128)
    too_long_post = FactoryBot.build(:post, title: 'a' * 129)

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

  it 'has a method that returns posts with status in array' do
    post_status1 = FactoryBot.create(:post_status)
    post_status2 = FactoryBot.create(:post_status)
    post1 = FactoryBot.create(:post, post_status: post_status1)
    post2 = FactoryBot.create(:post, post_status: post_status2)
    post

    expected = Post.where(post_status_id: [post_status1.id, post_status2.id])
    got = Post.find_with_post_status_in([post_status1, post_status2])

    expect(expected).to eq(got)
  end

  it 'has a method that returns posts with title or description like search query' do
    post1 = FactoryBot.create(:post, title: 'Fantastic title', description: 'Fabolous description')
    post2 = FactoryBot.create(:post, title: 'Incredible title', description: 'Wonderful description')

    expect(Post.search_by_name_or_description('fantastic').first).to eq(post1)
    expect(Post.search_by_name_or_description('WONDERFUL').first).to eq(post2)
    expect(Post.search_by_name_or_description('brutiful').first).to be_nil

    expect { Post.search_by_name_or_description(nil) }.not_to raise_error
    expect { Post.search_by_name_or_description('dangerous symbols: " \' %') }.not_to raise_error
  end
end
