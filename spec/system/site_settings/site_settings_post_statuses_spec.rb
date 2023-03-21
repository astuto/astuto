require 'rails_helper'

feature 'site settings: post statuses', type: :system, js: true do
  let(:user) { FactoryBot.create(:admin) }
  let(:post_status1) { FactoryBot.create(:post_status) }
  let(:post_status2) { FactoryBot.create(:post_status) }

  let(:post_statuses_list_selector) { '.postStatusesList' }
  let(:post_status_list_item_selector) { '.postStatusEditable' }
  let(:post_status_form_selector) { '.postStatusForm' }

  before(:each) do
    post_status1
    post_status2
    
    user.confirm
    sign_in user

    visit site_settings_post_statuses_path
  end

  it 'lets view existing post statuses' do
    within post_statuses_list_selector do
      expect(page).to have_selector(post_status_list_item_selector, count: PostStatus.count)

      expect(page).to have_content(/#{post_status1.name}/i)

      expect(page).to have_content(/#{post_status2.name}/i)
    end
  end

  it 'lets create new post statuses' do
    n_of_post_statuses = PostStatus.count
    new_post_status_name = 'My new post status'

    within post_statuses_list_selector do
      expect(page).to have_selector(post_status_list_item_selector, count: n_of_post_statuses)

      expect(page).not_to have_content(/#{new_post_status_name}/i)
    end

    within post_status_form_selector do
      fill_in 'name', with: new_post_status_name
      click_button 'Create'
    end

    within post_statuses_list_selector do
      expect(page).to have_selector(post_status_list_item_selector, count: n_of_post_statuses + 1)

      expect(page).to have_content(/#{new_post_status_name}/i)
    end

    expect(PostStatus.count).to eq(n_of_post_statuses + 1)
  end

  it 'lets edit existing post statuses' do
    edited_post_status_name = 'My edited post status'

    within post_statuses_list_selector do
      expect(page).not_to have_content(/#{edited_post_status_name}/i)

      within post_status_list_item_selector, match: :first do
        find('.editAction').click
        fill_in 'name', with: edited_post_status_name
        click_button 'Save'
      end

      expect(page).to have_content(/#{edited_post_status_name}/i)
    end
  end

  it 'lets delete existing post statuses' do
    n_of_post_statuses = PostStatus.count

    within post_statuses_list_selector do
      expect(page).to have_selector(post_status_list_item_selector, count: n_of_post_statuses)

      within post_status_list_item_selector, match: :first do
        find('.deleteAction').click

        alert = page.driver.browser.switch_to.alert
        expect(alert.text).to eq('Are you sure?')
        alert.accept
      end

      expect(page).to have_selector(post_status_list_item_selector, count: n_of_post_statuses - 1)
    end

    expect(PostStatus.count).to eq(n_of_post_statuses - 1)
  end
end