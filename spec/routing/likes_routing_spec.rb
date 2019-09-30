require 'rails_helper'

RSpec.describe 'likes routing', :aggregate_failures, type: :routing do
  it 'routes likes' do
    expect(get: '/posts/1/likes').to route_to(
      controller: 'likes', action: 'index', post_id: '1'
    )
    expect(post: '/posts/1/likes').to route_to(
      controller: 'likes', action: 'create', post_id: '1'
    )
    expect(delete: '/posts/1/likes').to route_to(
      controller: 'likes', action: 'destroy', post_id: '1'
    )

    expect(get: '/posts/1/likes/1').not_to be_routable
    expect(get: '/posts/1/likes/new').not_to be_routable
    expect(get: '/posts/1/likes/1/edit').not_to be_routable
    expect(patch: '/posts/1/likes/1').not_to be_routable
  end
end