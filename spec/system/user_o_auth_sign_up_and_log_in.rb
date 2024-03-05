require 'rails_helper'

feature 'oauth sign up / log in', type: :system, js: true do
  let(:o_auth) { FactoryBot.create(:o_auth, is_enabled: true) }
  let(:disabled_o_auth) { FactoryBot.create(:o_auth, is_enabled: false) }
  let(:default_o_auth) { FactoryBot.create(:default_o_auth, is_enabled: true) }
  let(:disabled_default_o_auth) { FactoryBot.create(:default_o_auth, is_enabled: false) }

  let(:o_auth_button_selector) { '.oauthProviderBtn' }

  before(:each) do
    o_auth
    disabled_o_auth
    default_o_auth
    disabled_default_o_auth
  end

  it 'shows sign up links for enabled oauths' do
    visit new_user_registration_path

    expect(page).to have_css(o_auth_button_selector, count: 1)
    expect(page).to have_content(/#{o_auth.name}/i)
    expect(page).not_to have_content(/#{default_o_auth.name}/i)
    expect(page).not_to have_content(/#{disabled_o_auth.name}/i)
    expect(page).not_to have_content(/#{disabled_default_o_auth.name}/i)

    OAuth.tenant_default_o_auths.create

    visit new_user_registration_path
    expect(page).to have_css(o_auth_button_selector, count: 2)
    expect(page).to have_content(/#{default_o_auth.name}/i)
  end

  it 'shows log in links for enabled oauths' do
    visit new_user_session_path

    expect(page).to have_css(o_auth_button_selector, count: 1)
    expect(page).to have_content(/#{o_auth.name}/i)
    expect(page).not_to have_content(/#{default_o_auth.name}/i)
    expect(page).not_to have_content(/#{disabled_o_auth.name}/i)
    expect(page).not_to have_content(/#{disabled_default_o_auth.name}/i)

    OAuth.tenant_default_o_auths.create

    visit new_user_session_path
    expect(page).to have_css(o_auth_button_selector, count: 2)
    expect(page).to have_content(/#{default_o_auth.name}/i)
  end
end