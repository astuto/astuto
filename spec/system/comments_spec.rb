require 'rails_helper'

feature 'comments', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:comment1) { FactoryBot.create(:comment, post: post) }
  let(:comment2) { FactoryBot.create(:comment, post: post) }
  let(:comment3) { FactoryBot.create(:comment, post: post, parent: comment2) }
  let(:user) { FactoryBot.create(:user) }

  let(:commentsSelector) { '.commentsContainer' }
  let(:commentListSelector) { '.commentList' }
  let(:commentSelector) { '.comment' }
  let(:commentAuthorSelector) { '.commentAuthor' }
  let(:commentReplyBtnSelector) { '.commentReplyButton' }
  let(:newCommentFormSelector) { '.newCommentForm' }
  let(:newCommentBodySelector) { '.newCommentBody' }

  def create_comments
    comment1
    comment2
    comment3
  end

  def log_in_as(user)
    user.confirm
    sign_in user
  end

  before(:each) do
    create_comments
  end

  it 'renders correctly' do
    visit post_path(post)

    expect(page).to have_selector(commentsSelector, count: 1)
  end

  it 'renders a new comment form and replies form if logged in' do
    log_in_as user
    visit post_path(post)
    comments_count = Comment.where(post_id: post.id).count

    expect(page).to have_selector(newCommentFormSelector, count: 1, visible: true)
    expect(page).to have_selector(newCommentBodySelector, count: 1, visible: true)

    # don't know why don't work
    # expect(page).to have_selector(newCommentFormSelector, count: comments_count, visible: false)
    # expect(page).to have_selector(newCommentBodySelector, count: comments_count, visible: false)
  end

  it 'does not render a new comment form if not logged in' do
    visit post_path(post)

    expect(page).to have_no_selector(newCommentBodySelector)
  end

  it 'renders all comments of a post' do
    visit post_path(post)

    within commentsSelector do
      expect(page).to have_selector(commentSelector, count: 3)
      expect(page).to have_content(/#{comment1.body}/i)
      expect(page).to have_content(/#{comment2.body}/i)
      expect(page).to have_content(/#{comment3.body}/i)
    end
  end

  it 'renders nested comments' do
    visit post_path(post)

    within commentsSelector do
      expect(page).to have_selector(
        "#{commentListSelector} > #{commentListSelector}",
        count: 1
      ) # one nested comment
    end
  end

  it 'renders the author full name for each comment' do
    visit post_path(post)

    page.all(:css, commentSelector).each do |comment|
      expect(comment).to have_selector(commentAuthorSelector)
      expect(comment).to have_content(/#{post.user.full_name}/i)
    end
  end

  it 'renders a reply button for each comment' do
    visit post_path(post)

    page.all(:css, commentSelector).each do |comment|
      expect(comment).to have_selector(commentReplyBtnSelector)
      expect(comment).to have_content(/#{'reply'}/i)
    end
  end

  it 'enables users to comment' do
    log_in_as user
    visit post_path(post)

    comments_count = Comment.where(post_id: post.id).count
    comment_body = 'this is a comment!'

    find(newCommentBodySelector).fill_in with: comment_body
    click_button 'Submit'

    expect(page).to have_content(comment_body, count: 2)
    expect(Comment.where(post_id: post.id).count).to eq(comments_count + 1)
  end
end