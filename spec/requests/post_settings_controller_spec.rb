require 'rails_helper'

RSpec.describe 'post_settings controller', type: :request do
  let!(:user) { FactoryBot.create(:admin) }

  before(:each) do
    user.confirm
    sign_in user
  end

  describe '.index' do
    let!(:post_setting) { FactoryBot.create(:post_setting) }

    it 'returns post settings' do
      get post_settings_path
      parsed_response = JSON.parse(response.body)

      expect(parsed_response.dig(0, "id")).to eq(post_setting.id)
      expect(parsed_response.dig(0, "archive_after")).to eq(post_setting.archive_after)
    end
  end

  describe '.create' do
    let(:archive_after) { 42 }

    it 'creates a new post setting' do
      post(
        post_settings_path,
        params: {
          post_setting: {
            archive_after: archive_after
          }
        }
      )

      expect(response).to have_http_status(:success)
      expect(ActiveRecord::Base.connection.execute("SELECT \"archive_after\" FROM \"post_settings\" LIMIT 1").to_a.dig(0, "archive_after")).to eq(archive_after)
    end
  end
end