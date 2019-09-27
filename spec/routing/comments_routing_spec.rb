require 'rails_helper'

RSpec.describe 'comments routing', :aggregate_failures, type: :routing do
  it 'routes comments' do
    expect(get: '/posts/1/comments').to route_to(
      controller: 'comments', action: 'index', post_id: "1"
    )
    expect(post: '/posts/1/comments').to route_to(
      controller: 'comments', action: 'create', post_id: "1"
    )

    expect(get: '/posts/1/comments/1').not_to be_routable
    expect(get: '/posts/1/comments/new').not_to be_routable
    expect(get: '/posts/1/comments/1/edit').not_to be_routable
    expect(patch: '/posts/1/comments/1').not_to be_routable
    expect(delete: '/posts/1/comments/1').not_to be_routable
  end
end