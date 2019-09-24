require 'rails_helper'

feature 'post', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:mod) { FactoryBot.create(:moderator) }

  let(:selectPickerBoard) { 'selectPickerBoard' }
  let(:selectPickerStatus) { 'selectPickerStatus' }

  it 'renders post title, description, board and status' do
    visit post_path(post)

    expect(page).to have_content(/#{post.title}/i)
    expect(page).to have_content(/#{post.description}/i)
    expect(page).to have_content(/#{post.board.name}/i)
    expect(page).to have_content(/#{post.post_status.name}/i)
  end

  it 'enables admins and mods to edit post board' do
    mod.confirm
    sign_in mod
    board1 = FactoryBot.create(:board)

    visit post_path(post)

    expect(post.board_id).not_to eq(board1.id)
    expect(page).to have_select selectPickerBoard,
      selected: post.board.name,
      options: [post.board.name, board1.name]
    
    select board1.name, from: selectPickerBoard
    expect(page).to have_select selectPickerBoard, selected: board1.name
    expect(post.reload.board_id).to eq(board1.id)
  end

  it 'enables admins and mods to edit post status' do
    mod.confirm
    sign_in mod
    post_status1 = FactoryBot.create(:post_status)

    visit post_path(post)

    expect(post.post_status_id).not_to eq(post_status1.id)
    expect(page).to have_select selectPickerStatus,
      selected: post.post_status.name,
      options: [post.post_status.name, post_status1.name, 'None']

    select post_status1.name, from: selectPickerStatus
    expect(page).to have_select selectPickerStatus, selected: post_status1.name
    expect(post.reload.post_status_id).to eq(post_status1.id)

    select 'None', from: selectPickerStatus
    expect(page).to have_select selectPickerStatus, selected: 'None'
    expect(post.reload.post_status_id).to be_nil
  end

  it 'does not show board and status selection to users' do
    visit post_path(post)

    expect(page).to have_no_select selectPickerBoard
    expect(page).to have_no_select selectPickerStatus
  end
end