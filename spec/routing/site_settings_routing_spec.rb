require 'rails_helper'

RSpec.describe 'site settings routing', :aggregate_failures, type: :routing do
  let (:base_url) { '/site_settings' }

  it 'routes general' do
    expect(get: base_url + '/general').to route_to(
      controller: 'site_settings', action: 'general'
    )
  end

  it 'routes boards' do
    expect(get: base_url + '/boards').to route_to(
      controller: 'site_settings', action: 'boards'
    )
  end

  it 'routes post statuses' do
    expect(get: base_url + '/post_statuses').to route_to(
      controller: 'site_settings', action: 'post_statuses'
    )
  end

  it 'routes roadmap' do
    expect(get: base_url + '/roadmap').to route_to(
      controller: 'site_settings', action: 'roadmap'
    )
  end
end