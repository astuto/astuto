require 'rails_helper'

RSpec.describe 'board routing', :aggregate_failures, type: :routing do
  it 'only routes the page to show a board' do
    expect(get: '/boards/1').to route_to(
      controller: 'boards', action: 'show', id: '1'
    )

    expect(get: '/boards').not_to be_routable
    expect(get: '/boards/1/edit').not_to be_routable
    expect(post: '/boards').not_to be_routable
    expect(patch: '/boards/1').not_to be_routable
    expect(delete: '/boards/1').not_to be_routable
  end
end