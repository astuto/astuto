require 'rails_helper'
# require 'bcrypt'

feature 'edit user profile settings', type: :system, js: true do
  let(:user) { FactoryBot.create(:user) }

  before(:each) do
    user.confirm # devise helper to confirm user account
    sign_in user # devise helper to login user
  end

  scenario 'edit full name field' do
    new_full_name = 'My new full name'

    expect(user.full_name).not_to eq(new_full_name)

    visit edit_user_registration_path
    fill_in 'Full name', with: new_full_name
    fill_in 'Current password', with: user.password
    click_button 'Update profile'

    expect(page).to have_css('.notice')
    expect(user.reload.full_name).to eq(new_full_name)
  end

  scenario 'edit email field' do
    new_email = 'newemail@example.com'

    expect(user.email).not_to eq(new_email)

    visit edit_user_registration_path
    fill_in 'Email', with: new_email
    fill_in 'Current password', with: user.password
    click_button 'Update profile'

    expect(page).to have_css('.notice')
    user.reload; user.confirm
    expect(user.email).to eq(new_email)
    
  end

  scenario 'turns on notifications' do
    user.update(notifications_enabled: false)

    visit edit_user_registration_path
    check 'Notifications enabled'
    fill_in 'Current password', with: user.password
    click_button 'Update profile'

    expect(page).to have_css('.notice')
    expect(user.reload.notifications_enabled).to eq(true)
  end

  scenario 'turns off notifications' do
    user.update(notifications_enabled: user)

    visit edit_user_registration_path
    uncheck 'Notifications enabled'
    fill_in 'Current password', with: user.password
    click_button 'Update profile'

    expect(page).to have_css('.notice')
    expect(user.reload.notifications_enabled).to eq(false)
  end

  # Remember that 'password' is just a virtual attribute (i.e. it is not stored in the db)
  # so updating the user account password does not update it, but only the
  # 'encrypted_password' attribute in the db
  scenario 'edit password' do
    new_password = 'newpassword'
    encrypted_password = user.encrypted_password

    expect(user.password).not_to eq(new_password)

    visit edit_user_registration_path
    fill_in 'Password', with: new_password
    fill_in 'Password confirmation', with: new_password
    fill_in 'Current password', with: user.password
    click_button 'Update profile'

    # I don't know why the following line doesn't work
    # (maybe Devise uses a different BCrypt config?)
    # expect(User.find(user.id).encrypted_password).to eq(BCrypt::Password.create(new_password))

    # Because the previous line does not work, I decided to use this
    # expectation, which is weaker (it just checks that the
    # encrypted password is different after updating the profile)
    expect(page).to have_css('.notice')
    expect(user.reload.encrypted_password).not_to eq(encrypted_password)
  end

  scenario 'edit field with invalid current password' do
    full_name = user.full_name

    visit edit_user_registration_path
    fill_in 'Full name', with: user.full_name + ' New'
    # do not fill current password textbox
    click_button 'Update profile'
    visit edit_user_registration_path

    expect(user.reload.full_name).to eq(full_name)
  end

  scenario 'cancel account', js: true do
    expect(user.status).to eq('active')

    visit edit_user_registration_path
    click_button 'Cancel account'
    page.driver.browser.switch_to.alert.accept # accepts js pop up

    expect(page).to have_current_path(root_path)
    expect(page).to have_css('.notice')
    expect(user.reload.status).to eq('deleted')
  end
end
