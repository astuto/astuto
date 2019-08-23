require 'rails_helper'

RSpec.describe 'Requests to the admin panel', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:moderator) { FactoryBot.create(:moderator) }
  let(:admin) { FactoryBot.create(:admin) }

  before(:each) do
    user.confirm
    moderator.confirm
    admin.confirm
  end
  
  it 'requires a logged-in admin to administrate Users' do
    get admin_users_path
    expect(response).to redirect_to(new_user_session_path)

    sign_in user
    get admin_users_path
    expect(response).to redirect_to(root_path)

    sign_in moderator
    get admin_users_path
    expect(response).to redirect_to(root_path)

    sign_in admin
    get admin_users_path
    expect(response).to have_http_status(:success)
  end

  it 'requires at least a logged-in moderator to administrate Boards' do
    get admin_boards_path
    expect(response).to redirect_to(new_user_session_path)

    sign_in user
    get admin_boards_path
    expect(response).to redirect_to(root_path)

    sign_in moderator
    get admin_boards_path
    expect(response).to have_http_status(:success)

    sign_in admin
    get admin_boards_path
    expect(response).to have_http_status(:success)
  end
end