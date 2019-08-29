require 'rails_helper'

RSpec.describe 'requests to users in the admin panel', :admin_panel, type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:moderator) { FactoryBot.create(:moderator) }
  let(:admin) { FactoryBot.create(:admin) }

  context 'when user is not logged in' do
    it 'redirects index action' do
      get admin_users_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects show action' do
      get admin_user_path(user)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects new action' do
      get new_admin_user_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects edit action' do
      get edit_admin_user_path(user)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects create action' do
      post admin_users_path, params: { user: { full_name: user.full_name, email: user.email + 'a', password: user.password } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects update action' do
      patch admin_user_path(user), params: { user: { full_name: user.full_name } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects destroy action' do
      delete admin_user_path(user)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  context 'when user has role "user"' do
    before(:each) do
      user.confirm
      sign_in user
    end

    it 'redirects index action' do
      get admin_users_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects show action' do
      get admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects new action' do
      get new_admin_user_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects edit action' do
      get edit_admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects create action' do
      post admin_users_path, params: { user: { full_name: user.full_name, email: user.email + 'a', password: user.password } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects update action' do
      patch admin_user_path(user), params: { user: { full_name: user.full_name } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects destroy action' do
      delete admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
  end

  context 'when user has role "moderator"' do
    before(:each) do
      moderator.confirm
      sign_in moderator
    end

    it 'redirects index action' do
      get admin_users_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects show action' do
      get admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects new action' do
      get new_admin_user_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects edit action' do
      get edit_admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects create action' do
      post admin_users_path, params: { user: { full_name: user.full_name, email: user.email + 'a', password: user.password } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects update action' do
      patch admin_user_path(user), params: { user: { full_name: user.full_name } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects destroy action' do
      delete admin_user_path(user)
      expect(response).to redirect_to(root_path)
    end
  end

  context 'when user has role "admin"' do
    before(:each) do
      admin.confirm
      sign_in admin
    end

    it 'fulfills index action' do
      get admin_users_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get admin_user_path(user)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills new action' do
      get new_admin_user_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills edit action' do
      get edit_admin_user_path(user)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills create action' do
      post admin_users_path, params: { user: { full_name: user.full_name, email: user.email + 'a', password: user.password } }
      expect(response).to redirect_to(admin_user_path(user.id + 1))
    end
    it 'fulfills update action' do
      patch admin_user_path(user), params: { user: { full_name: user.full_name + 'a', password: '' } }
      expect(response).to redirect_to(admin_user_path(user))
    end
    it 'fulfills destroy action' do
      delete admin_user_path(user)
      expect(response).to redirect_to(admin_users_path)
    end
  end
end