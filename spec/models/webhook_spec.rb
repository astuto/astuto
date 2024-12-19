require 'rails_helper'

RSpec.describe Webhook, type: :model do
  let(:webhook) { FactoryBot.build(:webhook) }

  it 'has a valid factory' do
    expect(webhook).to be_valid
  end

  it 'must have a name' do
    webhook.name = nil
    expect(webhook).to be_invalid
  end

  it 'must have a url' do
    webhook.url = nil
    expect(webhook).to be_invalid
  end

  it 'must have a trigger' do
    webhook.trigger = nil
    expect(webhook).to be_invalid
  end

  it 'must have a http_method' do
    webhook.http_method = nil
    expect(webhook).to be_invalid
  end

  it 'is disabled by default' do
    expect(webhook.is_enabled).to eq(false)
  end

  it 'can have the following triggers: new_post, new_post_pending_approval, delete_post, post_status_change, new_comment, new_vote, new_user' do
    webhook.trigger = 'new_post'
    expect(webhook).to be_valid

    webhook.trigger = 'new_post_pending_approval'
    expect(webhook).to be_valid

    webhook.trigger = 'delete_post'
    expect(webhook).to be_valid

    webhook.trigger = 'post_status_change'
    expect(webhook).to be_valid

    webhook.trigger = 'new_comment'
    expect(webhook).to be_valid

    webhook.trigger = 'new_vote'
    expect(webhook).to be_valid

    webhook.trigger = 'new_user'
    expect(webhook).to be_valid
  end

  it 'can have the following http_methods: http_post, http_put, http_patch, http_delete' do
    webhook.http_method = 'http_post'
    expect(webhook).to be_valid

    webhook.http_method = 'http_put'
    expect(webhook).to be_valid

    webhook.http_method = 'http_patch'
    expect(webhook).to be_valid

    webhook.http_method = 'http_delete'
    expect(webhook).to be_valid
  end
end
