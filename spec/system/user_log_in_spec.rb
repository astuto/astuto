require 'rails_helper'

feature 'log in', type: :system, js: true do
  let(:user) { FactoryBot.create(:user) }

  before(:each) { user.confirm }

  def log_in_as(user)
    visit new_user_session_path
    
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
  end

  scenario 'with valid credentials' do
    log_in_as user

    expect(page).not_to have_current_path(new_user_session_path)
    expect(page).to have_no_content('Log in')
    expect(page).to have_css('.notice')
  end

  scenario 'with invalid credentials' do
    visit new_user_session_path

    fill_in 'Email', with: user.email + 'a' # wrong email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content('Log in')
    expect(page).to have_css('.alert')
  end

  scenario 'log out' do
    sign_in user

    visit root_path
    find('#navbarDropdown').click # open dropdown menu
    click_button 'Sign out'
    
    expect(page).to have_current_path(root_path)
    expect(page).to have_content('Log in / Sign up')
    expect(page).to have_css('.notice')
  end

end