require 'rails_helper'

feature 'comments', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:comment1) { FactoryBot.create(:comment, post: post) }
  let(:comment2) { FactoryBot.create(:comment, post: post) }
  let(:comment3) { FactoryBot.create(:comment, post: post, parent: comment2) }
  let(:user) { FactoryBot.create(:user) }

  let(:commentsSelector) { '.comments' }
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

  before(:each) do
    create_comments
    visit post_path(post)
  end

  it 'renders correctly' do
    expect(page).to have_selector(commentsSelector, count: 1)
  end

  it 'renders all comments of a post' do
    within commentsSelector do
      expect(page).to have_selector(commentSelector, count: 3)
      expect(page).to have_content(/#{comment1.body}/i)
      expect(page).to have_content(/#{comment2.body}/i)
      expect(page).to have_content(/#{comment3.body}/i)
    end
  end

  it 'renders nested comments' do
    within commentsSelector do
      expect(page).to have_selector(
        "#{commentListSelector} > #{commentListSelector}",
        count: 1
      ) # 1 nested comment
    end
  end

  it 'renders the author full name for each comment' do
    page.all(:css, commentSelector).each do |comment|
      expect(comment).to have_selector(commentAuthorSelector)
      expect(comment).to have_content(/#{post.user.full_name}/i)
    end
  end

  it 'renders a reply button for each comment' do
    page.all(:css, commentSelector).each do |comment|
      expect(comment).to have_selector(commentReplyBtnSelector)
      expect(comment).to have_content(/#{'reply'}/i)
    end
  end
end