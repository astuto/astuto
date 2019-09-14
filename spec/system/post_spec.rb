require 'rails_helper'

feature 'post', type: :system, js: true do
  let(:post) { FactoryBot.create(:post) }
  let(:mod) { FactoryBot.create(:moderator) }

  it 'renders post title, description and status' do
    visit post_path(post)

    expect(page).to have_content(/#{post.title}/i)
    expect(page).to have_content(/#{post.description}/i)
    expect(page).to have_content(/#{post.post_status.name}/i)
  end

  it 'enables admins and mods to edit post status' do
    mod.confirm
    sign_in mod
    post_status1 = FactoryBot.create(:post_status)

    visit post_path(post)

    expect(post.post_status_id).not_to eq(post_status1.id)
    expect(page).to have_select 'Status:',
      selected: post.post_status.name,
      options: [post.post_status.name, post_status1.name, 'None']

    select post_status1.name, from: 'Status:'
    expect(page).to have_select 'Status:', selected: post_status1.name
    expect(post.reload.post_status_id).to eq(post_status1.id)

    select 'None', from: 'Status:'
    expect(page).to have_select 'Status:', selected: 'None'
    expect(post.reload.post_status_id).to be_nil
  end

  it 'does not show status selection to users' do
    visit post_path(post)
    expect(page).to have_no_select 'Status:'
  end
end