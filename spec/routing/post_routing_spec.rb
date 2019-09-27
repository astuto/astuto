require 'rails_helper'

RSpec.describe 'posts routing', :aggregate_failures, type: :routing do
  it 'routes posts' do
    expect(get: '/posts').to route_to(
      controller: 'posts', action: 'index'
    )
    expect(post: '/posts').to route_to(
      controller: 'posts', action: 'create'
    )
    expect(get: '/posts/1').to route_to(
      controller: 'posts', action: 'show', id: '1'
    )
    expect(patch: '/posts/1').to route_to(
      controller: 'posts', action: 'update', id: '1'
    )

    expect(get: '/posts/new').not_to route_to(
      controller: 'posts', action: 'new'
    )
    expect(get: '/posts/1/edit').not_to be_routable
    expect(delete: '/posts/1').not_to be_routable
  end
end