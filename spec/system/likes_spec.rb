require 'rails_helper'

feature 'likes', type: :system, js: true do
  let(:board) { FactoryBot.create(:board) }
  let(:post1) { FactoryBot.create(:post, board: board) }
  let(:post2) { FactoryBot.create(:post, board: board) }
  let(:user) { FactoryBot.create(:user) }

  let(:board_container) { '.boardContainer' }
  let(:like_button_container_selector) { '.likeButtonContainer' }
  let(:like_button_selector) { '.likeButton' }
  let(:likes_count_label_selector) { '.likesCountLabel' }

  before(:each) do
    board
    post1
    post2
  end

  context 'in post list of Board component' do
    it 'renders correctly for each post' do
      visit board_path(board)

      within board_container do
        expect(page).to have_selector(like_button_container_selector, count: 2)
        expect(page).to have_selector(like_button_selector, count: 2)
        expect(page).to have_selector(likes_count_label_selector, count: 2)
      end
    end

    it 'redirects when user not logged in' do
      visit board_path(board)

      within board_container do
        find(like_button_selector, match: :first).click
        expect(page.current_path).to eq(new_user_session_path)
      end
    end

    it 'likes and unlikes' do
      user.confirm
      sign_in user
      visit board_path(board)

      within board_container do
        first_like_button = find(like_button_selector, match: :first)
        like_container = find(like_button_container_selector, match: :first)

        # starts at zero likes
        expect(like_container).to have_content(0)

        # like
        first_like_button.click
        expect(like_container).to have_content(1)

        # unlike
        first_like_button.click
        expect(like_container).to have_content(0)
      end
    end
  end
end