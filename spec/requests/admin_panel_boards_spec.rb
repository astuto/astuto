require 'rails_helper'

RSpec.describe 'requests to boards in the admin panel', :admin_panel, type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:moderator) { FactoryBot.create(:moderator) }
  let(:admin) { FactoryBot.create(:admin) }

  let(:board) { FactoryBot.create(:board) }

  context 'when user is not logged in' do
    it 'redirects index action' do
      get admin_boards_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects show action' do
      get admin_board_path(board)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects new action' do
      get new_admin_board_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects edit action' do
      get edit_admin_board_path(board)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects create action' do
      post admin_boards_path, params: { board: { name: 'fakename' } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects update action' do
      patch admin_board_path(board), params: { board: { name: 'newname' } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects destroy action' do
      delete admin_board_path(board)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  context 'when user has role "user"' do
    before(:each) do
      user.confirm
      sign_in user
    end

    it 'redirects index action' do
      get admin_boards_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects show action' do
      get admin_board_path(board)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects new action' do
      get new_admin_board_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects edit action' do
      get edit_admin_board_path(board)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects create action' do
      post admin_boards_path, params: { board: { name: 'fakename' } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects update action' do
      patch admin_board_path(board), params: { board: { name: 'newname' } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects destroy action' do
      delete admin_board_path(board)
      expect(response).to redirect_to(root_path)
    end
  end

  context 'when user has role "moderator"' do
    before(:each) do
      moderator.confirm
      sign_in moderator
    end

    it 'fulfills index action' do
      get admin_boards_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get admin_board_path(board)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills new action' do
      get new_admin_board_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills edit action' do
      get edit_admin_board_path(board)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills create action' do
      post admin_boards_path, params: { board: { name: 'fakename'} }

      new_board = Board.last
      expect(new_board.name).to eq('fakename')
      expect(response).to redirect_to(admin_board_path(new_board))
    end
    it 'fulfills update action' do
      patch admin_board_path(board), params: { board: { name: 'newname' } }
      expect(board.reload.name).to eq('newname')
      expect(response).to redirect_to(admin_board_path(board))
    end
    it 'fulfills destroy action' do
      delete admin_board_path(board)
      expect(response).to redirect_to(admin_root_path)
    end
  end

  context 'when user has role "admin"' do
    before(:each) do
      admin.confirm
      sign_in admin
    end

    it 'fulfills index action' do
      get admin_boards_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get admin_board_path(board)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills new action' do
      get new_admin_board_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills edit action' do
      get edit_admin_board_path(board)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills create action' do
      post admin_boards_path, params: { board: { name: 'fakename' } }
      new_board = Board.last
      expect(new_board.name).to eq('fakename')
      expect(response).to redirect_to(admin_board_path(new_board))
    end
    it 'fulfills update action' do
      patch admin_board_path(board), params: { board: { name: 'newname' } }
      expect(board.reload.name).to eq('newname')
      expect(response).to redirect_to(admin_board_path(board))
    end
    it 'fulfills destroy action' do
      delete admin_board_path(board)
      expect(response).to redirect_to(admin_root_path)
    end
  end
end