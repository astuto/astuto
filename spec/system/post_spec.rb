require 'rails_helper'

feature 'post', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:mod) { FactoryBot.create(:moderator) }

  let(:select_picker_board) { 'selectPickerBoard' }
  let(:select_picker_status) { 'selectPickerStatus' }

  let(:post_container) { '.postAndCommentsContainer' }

  it 'renders post title, description, board and status' do
    visit post_path(post)

    expect(page).to have_content(/#{post.title}/i)
    expect(page).to have_content(/#{post.description}/i)
    expect(page).to have_content(/#{post.board.name}/i)
    expect(page).to have_content(/#{post.post_status.name}/i)
  end

  it 'lets edit the post' do
    mod.confirm
    sign_in mod
    new_title = 'New Post Title'
    new_description = 'New Post Description'
    new_board = FactoryBot.create(:board)
    new_post_status = FactoryBot.create(:post_status)
    
    visit post_path(post)

    within post_container do
      expect(page).not_to have_content(new_title)
      expect(page).not_to have_content(new_description)
      expect(page).not_to have_content(new_board.name.upcase)
      expect(page).not_to have_content(new_post_status.name.upcase)
    end

    within post_container do
      find('.editAction').click

      expect(page).to have_select(select_picker_board,
        selected: post.board.name,
        with_options: [post.board.name, new_board.name]
      )

      expect(page).to have_select(select_picker_status,
        selected: post.post_status.name,
        with_options: [post.post_status.name, new_post_status.name, 'None']
      )

      find('.postTitle').fill_in with: new_title
      find('.postDescription').fill_in with: new_description
      select new_board.name, from: select_picker_board
      select new_post_status.name, from: select_picker_status
      click_button 'Save'
    end

    within post_container do
      expect(page).to have_content(new_title)
      expect(page).to have_content(new_description)
      expect(page).to have_content(new_board.name.upcase)
      expect(page).to have_content(new_post_status.name.upcase)
    end
  end

  it 'lets delete the post' do
    mod.confirm
    sign_in mod
    
    visit post_path(post)
    post_count = Post.count

    within post_container do
      find('.deleteAction').click

      alert = page.driver.browser.switch_to.alert
      expect(alert.text).to eq('Are you sure?')
      alert.accept
    end

    expect(page).to have_current_path(board_path(post.board))
    expect(Post.count).to eq(post_count - 1)
  end
end