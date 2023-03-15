require 'rails_helper'

feature 'sign up', type: :system, js: true do
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
    expect(page).to have_content('Sign up')
  end

  scenario 'with valid fields' do
    user_count = User.count

    sign_up_as user

    expect(page).to have_current_path(root_path)
    expect(page).to have_css('.notice')
    expect(User.count).to eq(user_count + 1)
  end

  scenario 'with invalid Full Name' do
    user_count = User.count

    user.full_name = 'a'
    sign_up_as user

    expect_to_be_on_sign_up_page
    expect(page).to have_css('#error_explanation')
    expect(User.count).to eq(user_count)
  end

  scenario 'with invalid email' do
    user_count = User.count

    user.email = 'a'
    sign_up_as user

    # client side validation blocks submission if email format is incorrect
    # so we don't check for #error_explanation notice

    expect_to_be_on_sign_up_page
    expect(User.count).to eq(user_count)
  end

  scenario 'with already taken email' do
    user.save # create user with same email
    user_count = User.count

    sign_up_as user

    expect_to_be_on_sign_up_page
    expect(page).to have_css('#error_explanation')
    expect(page).to have_content('Email is already in use')
    expect(User.count).to eq(user_count)
  end

  scenario 'with invalid password' do
    user_count = User.count

    user.password = 'a'
    sign_up_as user

    expect_to_be_on_sign_up_page
    expect(page).to have_css('#error_explanation')
    expect(User.count).to eq(user_count)
  end

  scenario 'with mismatching passwords' do
    user_count = User.count

    visit new_user_registration_path
    fill_in 'Full name', with: user.full_name
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'Password confirmation', with: user.password + 'a'
    click_button 'Sign up'

    expect_to_be_on_sign_up_page
    expect(page).to have_css('#error_explanation')
    expect(User.count).to eq(user_count)
  end
end
