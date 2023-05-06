require 'rails_helper'

RSpec.describe 'static pages routing', :aggregate_failures, type: :routing do
  it 'routes roadmap' do
    expect(get: '/').to route_to(
      controller: 'static_pages', action: 'root'
    )
    
    expect(get: '/roadmap').to route_to(
      controller: 'static_pages', action: 'roadmap'
    )
  end

  it 'routes pending tenant page' do
    expect(get: '/pending-tenant').to route_to(
      controller: 'static_pages', action: 'pending_tenant'
    )
  end

  it 'routes blocked tenant page' do
    expect(get: '/blocked-tenant').to route_to(
      controller: 'static_pages', action: 'blocked_tenant'
    )
  end
end