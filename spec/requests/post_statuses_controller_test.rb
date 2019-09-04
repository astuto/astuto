require 'rails_helper'

RSpec.describe 'post statuses controller' do
  let(:post_status1) { FactoryBot.create(:post_status) }
  let(:post_status2) { FactoryBot.create(:post_status) }

  def create_post_statuses
    post_status1
    post_status2
  end

  describe 'index' do
    before(:each) { create_post_statuses }

    it 'returns all post statuses as JSON' do
      get post_statuses_path

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json.length).to eq(2)
      expect(json[0]['order']).to be <= json[1]['order']
    end
  end
end