require 'rails_helper'

RSpec.describe 'requests to posts controller', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:moderator) { FactoryBot.create(:moderator) }
  let(:admin) { FactoryBot.create(:admin) }

  let(:p) { FactoryBot.create(:post) }
  let(:board) { FactoryBot.build_stubbed(:board) }

  let(:headers) { headers = { "ACCEPT" => "application/json" } }

  context 'when user is not logged in' do
    it 'fulfills index action' do
      get posts_path
      expect(response).to have_http_status(:success)
    end
    it 'fulfills show action' do
      get posts_path(p)
      expect(response).to have_http_status(:success)
    end
    it 'blocks create action' do
      post posts_path, params: { post: { title: p.title } }, headers: headers
      expect(response).to have_http_status(:unauthorized)
    end
    it 'blocks update action' do
      patch post_path(p), params: { post: { title: p.title } }, headers: headers
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'user role' do
    before(:each) do
      user.confirm
      sign_in user
    end

    # it 'fulfills create action' do
    #   post posts_path, params: { post: { title: p.title, board_id: board.id, user_id: user.id } }, headers: headers
    #   expect(response).to have_http_status(:success)
    # end
    it 'blocks update action if from different user' do
      expect(user.id).not_to eq(p.user_id)
      patch post_path(p), params: { post: { title: p.title } }, headers: headers
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'moderator role' do
    before(:each) do
      moderator.confirm
      sign_in moderator
    end

    it 'fulfills update action' do
      expect(user.id).not_to eq(p.user_id)
      patch post_path(p), params: { post: { title: p.title } }, headers: headers
      expect(response).to have_http_status(:success)
    end
  end
end