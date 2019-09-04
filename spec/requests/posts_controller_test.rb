require 'rails_helper'

RSpec.describe 'posts controller', type: :request do
  let (:user) { FactoryBot.create(:user) }

  let(:board1) { FactoryBot.create(:board) }
  let(:board2) { FactoryBot.create(:board) }

  let(:post1) { FactoryBot.create(:post, board: board1) }
  let(:post2) { FactoryBot.create(:post, board: board1) }
  let(:post3) { FactoryBot.create(:post, board: board2) }

  def create_posts
    post1
    post2
    post3
  end

  describe 'index' do
    before(:each) { create_posts }

    it 'returns posts of first board (if no board id provided) as JSON' do
      get posts_path
      json1 = JSON.parse(response.body)

      get posts_path(board_id: Board.first.id)
      json2 = JSON.parse(response.body)

      expect(json1).to eq(json2)
    end

    it 'returns posts filtered by board id as JSON' do
      get posts_path(board_id: post1.board_id)

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json.length).to eq(2)
    end

    it 'returns posts filtered by post status id as JSON' do
      get posts_path(board_id: post1.board_id, post_status_id: post1.post_status_id)

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json.length).to eq(1)
    end
  end

  describe 'create' do
    before(:each) do
      user.confirm
      sign_in user
    end

    it 'creates a new post' do
      post_count = Post.count

      new_post = FactoryBot.build(:post, board: board1)

      post(
        posts_path,
        params: {
          post: {
            title: new_post.title,
            description: new_post.description,
            board_id: new_post.board_id
          }
        }
      )

      expect(response).to have_http_status(:success)
      expect(Post.count).to eq(post_count + 1)
    end

    it 'redirects if not logged in' do
      sign_out user

      post_count = Post.count

      new_post = FactoryBot.build(:post, board: board1)

      post(
        posts_path,
        params: {
          post: {
            title: new_post.title,
            description: new_post.description,
            board_id: new_post.board_id
          }
        }
      )

      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to(new_user_session_path)
      expect(Post.count).to eq(post_count)
    end
  end
end