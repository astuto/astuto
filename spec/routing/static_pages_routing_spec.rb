require 'rails_helper'

RSpec.describe 'static pages routing', :aggregate_failures, type: :routing do
  it 'routes roadmap' do
    expect(get: '/').to route_to(
      controller: 'static_pages', action: 'roadmap'
    )
    
    expect(get: '/roadmap').to route_to(
      controller: 'static_pages', action: 'roadmap'
    )
  end
end