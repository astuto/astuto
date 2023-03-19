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

  it 'permits to edit post board' do
    mod.confirm
    sign_in mod
    board1 = FactoryBot.create(:board)
    
    visit post_path(post)
    within post_container do
      expect(page).to have_content(post.board.name.upcase)
    end
    
    expect(post.board_id).not_to eq(board1.id)

    within post_container do
      # doesn't work: find('.editAction').click
      find('.actionLink', match: :first).click
    end

    expect(page).to have_select(select_picker_board,
      selected: post.board.name,
      with_options: [post.board.name, board1.name]
    )
    
    select board1.name, from: select_picker_board
    expect(page).to have_select select_picker_board, selected: board1.name

    click_button 'Save'

    within post_container do
      expect(page).to have_content(board1.name.upcase)
    end
    expect(post.reload.board_id).to eq(board1.id)
  end

  it 'permits to edit post status' do
    mod.confirm
    sign_in mod
    post_status1 = FactoryBot.create(:post_status)
    
    visit post_path(post)
    within post_container do
      expect(page).to have_content(post.post_status.name.upcase)
    end
    
    expect(post.post_status_id).not_to eq(post_status1.id)

    within post_container do
      # doesn't work: find('.editAction').click
      find('.actionLink', match: :first).click
    end

    expect(page).to have_select(select_picker_status,
      selected: post.post_status.name,
      with_options: [post.post_status.name, post_status1.name, 'None']
    )

    select post_status1.name, from: select_picker_status
    expect(page).to have_select select_picker_status, selected: post_status1.name

    click_button 'Save'
    within post_container do
      expect(page).to have_content(post_status1.name.upcase)
    end
    expect(post.reload.post_status_id).to eq(post_status1.id)
  end
end