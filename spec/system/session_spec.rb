require 'rails_helper'

RSpec.describe 'Session', type: :system do

  let(:user) { FactoryBot.create(:user) }

  before(:each) { user.confirm } # devise helper to confirm user email

  it 'allows guests to sign in' do
    user_count = User.count

    visit new_user_registration_path
    fill_in 'Full name', with: 'Test Test'
    fill_in 'Email', with: 'test@test.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'

    expect(User.count).to eq(user_count + 1)
  end

  # it 'allows users to log in' do
  #   visit new_user_session_path
  #   fill_in "Email", with: user.email
  #   fill_in "Password", with: user.password
  #   click_button "Log in"

  #   expect(current_path).to eq(root_path)
  # end

end