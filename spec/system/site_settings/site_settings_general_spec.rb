require 'rails_helper'

feature 'site settings: general', type: :system, js: true do
  let(:admin) { FactoryBot.create(:admin) }


  before(:each) do
    admin.confirm
    sign_in admin
    
    visit site_settings_general_path
  end

  it 'lets edit the site name and logo' do
    new_site_name = 'New Site Name'
    new_site_logo = 'https://www.example.com/logo.png'

    expect(page).to have_field('Site name', with: Current.tenant.site_name)
    expect(page).to have_field('Site logo', with: Current.tenant.site_logo)

    expect(Current.tenant.site_name).not_to eq(new_site_name)
    expect(Current.tenant.site_logo).not_to eq(new_site_logo)

    fill_in 'Site name', with: new_site_name
    fill_in 'Site logo', with: new_site_logo
    find('button', text: 'Save', match: :first).click

    within '.siteSettingsInfo' do
      expect(page).to have_content('All changes saved')
    end
    
    expect(page).to have_field('Site name', with: new_site_name)
    expect(page).to have_field('Site logo', with: new_site_logo)
    
    t = Tenant.first
    expect(t.site_name).to eq(new_site_name)
    expect(t.site_logo).to eq(new_site_logo)
  end

  it 'lets edit the site language' do
    new_site_language = 'it'

    expect(Current.tenant.locale).not_to eq(new_site_language)

    select_by_value 'locale', new_site_language
    find('button', text: 'Save', match: :first).click

    within '.siteSettingsInfo' do
      expect(page).to have_content('Tutte le modifiche sono state salvate')
    end

    expect(Current.tenant.reload.locale).to eq(new_site_language)
  end
end