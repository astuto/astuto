require 'rails_helper'

feature 'comments', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:comment1) { FactoryBot.create(:comment, post: post) }
  let(:comment2) { FactoryBot.create(:comment, post: post) }
  let(:comment3) { FactoryBot.create(:comment, post: post, parent: comment2) }
  let(:user) { FactoryBot.create(:user) }

  let(:comments_selector) { '.commentsContainer' }
  let(:comment_list_selector) { '.commentList' }
  let(:comment_selector) { '.comment' }
  let(:comment_author_selector) { '.commentAuthor' }
  let(:comment_reply_btn_selector) { '.replyAction' }
  let(:new_comment_form_selector) { '.newCommentForm' }
  let(:new_comment_body_selector) { '.commentForm' }

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

    expect(page).to have_selector(comments_selector, count: 1)
  end

  it 'renders a new comment form and replies form if logged in' do
    log_in_as user
    visit post_path(post)
    comments_count = Comment.where(post_id: post.id).count

    expect(page).to have_selector(new_comment_form_selector, count: 1, visible: true)
    expect(page).to have_selector(new_comment_body_selector, count: 1, visible: true)
  end

  it 'does not render a new comment form if not logged in' do
    visit post_path(post)

    expect(page).to have_no_selector(new_comment_body_selector)
  end

  it 'renders all comments of a post' do
    visit post_path(post)

    within comments_selector do
      expect(page).to have_selector(comment_selector, count: 3)
      expect(page).to have_content(/#{comment1.body}/i)
      expect(page).to have_content(/#{comment2.body}/i)
      expect(page).to have_content(/#{comment3.body}/i)
    end
  end

  it 'renders nested comments' do
    visit post_path(post)

    within comments_selector do
      expect(page).to have_selector(
        "#{comment_list_selector} #{comment_list_selector}",
        count: 1
      ) # one nested comment
    end
  end

  it 'renders the author full name for each comment' do
    visit post_path(post)

    page.all(:css, comment_selector).each do |comment|
      expect(comment).to have_selector(comment_author_selector)
      expect(comment).to have_content(/#{post.user.full_name}/i)
    end
  end

  it 'renders a reply button for each comment' do
    visit post_path(post)

    page.all(:css, comment_selector).each do |comment|
      expect(comment).to have_selector(comment_reply_btn_selector)
      expect(comment).to have_content(/#{'Reply'}/i)
    end
  end

  it 'enables users to comment' do
    log_in_as user
    visit post_path(post)

    comments_count = Comment.where(post_id: post.id).count
    expect(page).to have_selector(comment_selector, count: comments_count)

    comment_body = 'this is a comment!'

    find(new_comment_body_selector).fill_in with: comment_body
    click_button 'Submit'

    expect(page).to have_selector(comment_selector, count: comments_count + 1)
    expect(Comment.where(post_id: post.id).count).to eq(comments_count + 1)
  end
end
