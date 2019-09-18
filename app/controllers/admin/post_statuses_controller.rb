module Admin
  class PostStatusesController < Admin::ApplicationController
    before_action :default_order

    def default_order
      @order ||= Administrate::Order.new(
        params.fetch(resource_name, {}).fetch(:order, 'order'),
        params.fetch(resource_name, {}).fetch(:direction, 'asc'),
      )
    end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
  end
end
