require 'rails_helper'

feature 'site settings: users', type: :system, js: true do
  let(:admin) { FactoryBot.create(:admin) }
  let(:user) { FactoryBot.create(:user) }

  let(:users_list_selector) { '.usersList' }
  let(:user_list_item_selector) { '.userEditable' }
  let(:select_picker_role_selector) { 'selectPickerUserRole' }

  before(:each) do
    admin.confirm
    sign_in admin

    user

    visit site_settings_users_path
  end

  it 'lets view existing users' do
    within users_list_selector do
      expect(page).to have_selector(user_list_item_selector, count: User.count)

      expect(page).to have_content(/#{admin.full_name}/i)
      expect(page).to have_content(/#{admin.role}/i)

      expect(page).to have_content(/#{user.full_name}/i)
      expect(page).to have_content(/#{user.role}/i)
    end
  end

  it 'lets edit the role of existing users' do
    user_to_edit = User.last
    new_role = 'moderator'

    expect(user_to_edit.role).not_to eq(new_role)

    within users_list_selector do
      within find(user_list_item_selector, text: /#{user_to_edit.full_name}/i) do
        expect(page).not_to have_content(/#{new_role}/i)  

        find('.editAction').click

        expect(page).to have_select(select_picker_role_selector,
          with_options: ['User', 'Moderator', 'Administrator']
        )

        select new_role.capitalize, from: select_picker_role_selector
        click_button 'Save'
        page.driver.browser.switch_to.alert.accept

        expect(page).to have_content(/#{new_role}/i)
      end
    end

    within '.siteSettingsInfo' do
      expect(page).to have_content('All changes saved')
    end
    
    expect(user_to_edit.reload.role).to eq(new_role)
  end

  it 'lets block and unblock existing users' do
    user_to_edit = User.last

    expect(user_to_edit.status).to eq('active')

    within users_list_selector do
      within find(user_list_item_selector, text: /#{user_to_edit.full_name}/i) do
        expect(page).to have_selector('.blockAction')

        find('.blockAction').click
        page.driver.browser.switch_to.alert.accept

        expect(page).not_to have_selector('.blockAction')
        expect(page).to have_selector('.unblockAction')
        expect(user_to_edit.reload.status).to eq('blocked')

        find('.unblockAction').click
        page.driver.browser.switch_to.alert.accept

        expect(page).to have_selector('.blockAction')
        expect(page).not_to have_selector('.unblockAction')
        expect(user_to_edit.reload.status).to eq('active')
      end
    end
  end
end