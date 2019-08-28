require 'rails_helper'

feature 'sign up', type: :system do
  let(:user) { FactoryBot.build(:user) }

  def sign_up_as(user)
    visit new_user_registration_path
    fill_in 'Full name', with: user.full_name
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'Password confirmation', with: user.password
    click_button 'Sign up'
  end

  def expect_to_be_on_sign_up_page
    expect(page).to have_current_path(user_registration_path)
    expect(page).to have_content('Sign up')
  end

  scenario 'with valid fields' do
    user_count = User.count
    
    sign_up_as user
    
    expect(User.count).to eq(user_count + 1)
    expect(page).to have_current_path(root_path)
    expect(page).to have_css('.notice')
  end
  
  scenario 'with invalid Full Name' do
    user_count = User.count

    user.full_name = 'a'
    sign_up_as user

    expect(User.count).to eq(user_count)
    expect_to_be_on_sign_up_page
    expect(page).to have_css('.alert')
  end

  scenario 'with invalid email' do
    user_count = User.count

    user.email = 'a'
    sign_up_as user

    expect(User.count).to eq(user_count)
    expect_to_be_on_sign_up_page
    expect(page).to have_css('.alert')
  end

  scenario 'with invalid password' do
    user_count = User.count

    user.password = 'a'
    sign_up_as user

    expect(User.count).to eq(user_count)
    expect_to_be_on_sign_up_page
    expect(page).to have_css('.alert')
  end

  scenario 'with mismatching passwords' do
    user_count = User.count

    user.email = 'a'
    visit new_user_registration_path
    fill_in 'Full name', with: user.full_name
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'Password confirmation', with: user.password + 'a'
    click_button 'Sign up'

    expect(User.count).to eq(user_count)
    expect_to_be_on_sign_up_page
    expect(page).to have_css('.alert')
  end
end