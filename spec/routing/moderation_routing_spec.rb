require 'rails_helper'

RSpec.describe 'moderation routing', :aggregate_failures, type: :routing do
  let (:base_url) { '/moderation' }

  it 'routes feedback' do
    expect(get: base_url + '/feedback').to route_to(
      controller: 'moderation', action: 'feedback'
    )
  end

  it 'routes users' do
    expect(get: base_url + '/users').to route_to(
      controller: 'moderation', action: 'users'
    )
  end
end