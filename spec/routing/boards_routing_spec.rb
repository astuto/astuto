require 'rails_helper'

RSpec.describe 'boards routing', :aggregate_failures, type: :routing do
  it 'routes boards' do
    expect(get: '/boards/1').to route_to(
      controller: 'boards', action: 'show', id: '1'
    )

    expect(get: '/boards').to route_to(
      controller: 'boards', action: 'index'
    )
    
    expect(get: '/boards/new').not_to route_to(
      controller: 'boards', action: 'new'
    )

    expect(get: '/boards/1/edit').not_to be_routable

    expect(post: '/boards').to route_to(
      controller: 'boards', action: 'create'
    )

    expect(patch: '/boards/1').to route_to(
      controller: 'boards', action: 'update', id: '1'
    )

    expect(delete: '/boards/1').to route_to(
      controller: 'boards', action: 'destroy', id: '1'
    )
  end
end