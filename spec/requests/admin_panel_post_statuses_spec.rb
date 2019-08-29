require 'rails_helper'

RSpec.describe 'requests to post statuses in the admin panel', :admin_panel, type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:moderator) { FactoryBot.create(:moderator) }
  let(:admin) { FactoryBot.create(:admin) }

  let(:post_status) { FactoryBot.create(:post_status) }

  context 'when user is not logged in' do
    it 'redirects index action' do
      get admin_post_statuses_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects show action' do
      get admin_post_status_path(post_status)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects new action' do
      get new_admin_post_status_path
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects edit action' do
      get edit_admin_post_status_path(post_status)
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects create action' do
      post admin_post_statuses_path, params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects update action' do
      patch admin_post_status_path(post_status), params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(new_user_session_path)
    end
    it 'redirects destroy action' do
      delete admin_post_status_path(post_status)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  context 'when user has role "user"' do
    before(:each) do
      user.confirm
      sign_in user
    end

    it 'redirects index action' do
      get admin_post_statuses_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects show action' do
      get admin_post_status_path(post_status)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects new action' do
      get new_admin_post_status_path
      expect(response).to redirect_to(root_path)
    end
    it 'redirects edit action' do
      get edit_admin_post_status_path(post_status)
      expect(response).to redirect_to(root_path)
    end
    it 'redirects create action' do
      post admin_post_statuses_path, params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects update action' do
      patch admin_post_status_path(post_status), params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(root_path)
    end
    it 'redirects destroy action' do
      delete admin_post_status_path(post_status)
      expect(response).to redirect_to(root_path)
    end
  end

  context 'when user has role "moderator"' do
    before(:each) do
      moderator.confirm
      sign_in moderator
    end

    it 'fulfills index action' do
      get admin_post_statuses_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get admin_post_status_path(post_status)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills new action' do
      get new_admin_post_status_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills edit action' do
      get edit_admin_post_status_path(post_status)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills create action' do
      post admin_post_statuses_path, params: { post_status: { name: post_status.name + 'a', color: post_status.color } }
      expect(response).to redirect_to(admin_post_status_path(post_status.id + 1))
    end
    it 'fulfills update action' do
      patch admin_post_status_path(post_status), params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(admin_post_status_path(post_status))
    end
    it 'fulfills destroy action' do
      delete admin_post_status_path(post_status)
      expect(response).to redirect_to(admin_post_statuses_path)
    end
  end

  context 'when user has role "admin"' do
    before(:each) do
      admin.confirm
      sign_in admin
    end

    it 'fulfills index action' do
      get admin_post_statuses_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get admin_post_status_path(post_status)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills new action' do
      get new_admin_post_status_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills edit action' do
      get edit_admin_post_status_path(post_status)
      expect(response).to have_http_status(:success)
    end
    it 'fulfills create action' do
      post admin_post_statuses_path, params: { post_status: { name: post_status.name + 'a', color: post_status.color } }
      expect(response).to redirect_to(admin_post_status_path(post_status.id + 1))
    end
    it 'fulfills update action' do
      patch admin_post_status_path(post_status), params: { post_status: { name: post_status.name + 'a' } }
      expect(response).to redirect_to(admin_post_status_path(post_status))
    end
    it 'fulfills destroy action' do
      delete admin_post_status_path(post_status)
      expect(response).to redirect_to(admin_post_statuses_path)
    end
  end
end