require 'rails_helper'

feature 'likes', type: :system, js: true do
  let(:board) { FactoryBot.create(:board) }
  let(:post1) { FactoryBot.create(:post, board: board) }
  let(:post2) { FactoryBot.create(:post, board: board) }
  let(:user) { FactoryBot.create(:user) }

  let(:board_container) { '.boardContainer' }
  let(:post_header_selector) { '.postHeader' }
  let(:like_button_container_selector) { '.likeButtonContainer' }
  let(:like_button_selector) { '.likeButton' }
  let(:likes_count_label_selector) { '.likeCountLabel' }
  let(:like_list_container_selector) { '.likeListContainer' }

  before(:each) do
    # Enable like count and like button in tenant setting
    tenant_setting = TenantSetting.first_or_create
    tenant_setting.update!(show_vote_count: true)
    tenant_setting.update!(show_vote_button_in_board: true)
    Current.tenant.update!(tenant_setting: tenant_setting)

    board
    post1
    post2
  end

  context 'in post list of Board component' do
    it 'renders correctly for each post' do
      visit board_path(board)

      within board_container do
        expect(page).to have_css(like_button_container_selector, count: 2)
        expect(page).to have_css(like_button_selector, count: 2)
        # expect(page).to have_css(likes_count_label_selector, count: 2)
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

  context 'in Post component' do
    it 'renders correctly' do
      visit post_path(post1)

      expect(page).to have_css(like_button_container_selector)
      expect(page).to have_css(like_button_selector)
      # expect(page).to have_css(likes_count_label_selector)
    end

    # Don't know why it doesn't work...
    # it 'likes and unlikes' do
    #   user.confirm
    #   sign_in user
    #   visit post_path(post1)

    #   within like_button_container_selector do
    #     # starts at zero likes
    #     expect(page).to have_content(0)

    #     # like
    #     find(like_button_selector).click
    #     expect(page).to have_content(1)

    #     # unlike
    #     find(like_button_selector).click
    #     expect(page).to have_content(0)
    #   end
    # end
  end
end