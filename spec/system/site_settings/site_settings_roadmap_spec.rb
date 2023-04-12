require 'rails_helper'

feature 'site settings: roadmap', type: :system, js: true do
  let(:user) { FactoryBot.create(:admin) }

  let(:post_status_in_roadmap) { FactoryBot.create(:post_status, show_in_roadmap: true) }
  let(:post_status_not_in_roadmap) { FactoryBot.create(:post_status, show_in_roadmap: false) }

  let(:in_roadmap_post_statuses_selector) { '.inRoadmapPostStatuses' }
  let(:not_in_roadmap_post_statuses_selector) { '.notInRoadmapPostStatuses' }
  let(:post_status_selector) { '.roadmapPostStatus' }
  let(:drag_zone_selector) { '.drag-zone' }

  before(:each) do
    post_status_in_roadmap
    post_status_not_in_roadmap

    user.confirm
    sign_in user

    visit site_settings_roadmap_path
  end

  it 'lets view post statuses divided in roadmap and not in roadmap' do
    expect(post_status_in_roadmap.show_in_roadmap).to eq(true)
    expect(post_status_not_in_roadmap.show_in_roadmap).to eq(false)

    within in_roadmap_post_statuses_selector do
      expect(page).to have_css(post_status_selector, count: 1)
      
      expect(page).to have_content(/#{post_status_in_roadmap.name}/i)
      expect(page).not_to have_content(/#{post_status_not_in_roadmap.name}/i)
    end

    within not_in_roadmap_post_statuses_selector do
      expect(page).to have_css(post_status_selector, count: 1)
      
      expect(page).not_to have_content(/#{post_status_in_roadmap.name}/i)
      expect(page).to have_content(/#{post_status_not_in_roadmap.name}/i)
    end
  end
end