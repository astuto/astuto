require 'rails_helper'

feature 'site settings: boards', type: :system, js: true do
  let(:user) { FactoryBot.create(:admin) }
  let(:board1) { FactoryBot.create(:board) }
  let(:board2) { FactoryBot.create(:board) }

  let(:boards_list_selector) { '.boardsList' }
  let(:board_list_item_selector) { '.boardEditable' }
  let(:board_form_selector) { '.boardForm' }

  before(:each) do
    board1
    board2
    
    user.confirm
    sign_in user

    visit site_settings_boards_path
  end
  
  it 'lets view existing boards' do
    within boards_list_selector do
      expect(page).to have_css(board_list_item_selector, count: Board.count)

      expect(page).to have_content(/#{board1.name}/i)
      expect(page).to have_content(/#{board1.description}/i)

      expect(page).to have_content(/#{board2.name}/i)
      expect(page).to have_content(/#{board2.description}/i)
    end
  end

  it 'lets create new boards' do
    n_of_boards = Board.count
    new_board_name = 'My new board'
    new_board_description = 'My new board description'

    within boards_list_selector do
      expect(page).to have_css(board_list_item_selector, count: n_of_boards)

      expect(page).not_to have_content(/#{new_board_name}/i)
      expect(page).not_to have_content(/#{new_board_description}/i)
    end

    within board_form_selector do
      fill_in 'name', with: new_board_name
      fill_in 'description', with: new_board_description
      click_button 'Create'
    end

    within boards_list_selector do
      expect(page).to have_css(board_list_item_selector, count: n_of_boards + 1)

      expect(page).to have_content(/#{new_board_name}/i)
      expect(page).to have_content(/#{new_board_description}/i)
    end

    expect(Board.count).to eq(n_of_boards + 1)
    
    new_board = Board.last
    expect(new_board.name).to eq(new_board_name)
    expect(new_board.description).to eq(new_board_description)
  end

  it 'lets edit existing boards' do
    board_to_edit = Board.first

    edited_board_name = 'My edited board'
    edited_board_description = 'My edited board description'

    expect(board_to_edit.name).not_to eq(edited_board_name)
    expect(board_to_edit.description).not_to eq(edited_board_description)

    within boards_list_selector do
      expect(page).not_to have_content(/#{edited_board_name}/i)
      expect(page).not_to have_content(/#{edited_board_description}/i)

      within board_list_item_selector, text: /#{board_to_edit.name}/i do
        find('.editAction').click
        fill_in 'name', with: edited_board_name
        fill_in 'description', with: edited_board_description
        click_button 'Save'
      end

      expect(page).to have_content(/#{edited_board_name}/i)
      expect(page).to have_content(/#{edited_board_description}/i)
    end

    board_to_edit.reload
    expect(board_to_edit.name).to eq(edited_board_name)
    expect(board_to_edit.description).to eq(edited_board_description)
  end

  it 'lets delete existing boards' do
    board_to_delete = Board.first
    n_of_boards = Board.count

    within boards_list_selector do
      expect(page).to have_css(board_list_item_selector, count: n_of_boards)

      within board_list_item_selector, text: /#{board_to_delete.name}/i do
        find('.deleteAction').click

        alert = page.driver.browser.switch_to.alert
        expect(alert.text).to eq('Are you sure?')
        alert.accept
      end

      expect(page).to have_css(board_list_item_selector, count: n_of_boards - 1)
    end

    expect(Board.count).to eq(n_of_boards - 1)
    expect(Board.find_by(id: board_to_delete.id)).to be_nil
  end
end