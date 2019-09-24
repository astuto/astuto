module Admin
  class CommentsController < Admin::ApplicationController
    before_action :default_order

    def default_order
      @order ||= Administrate::Order.new(
        params.fetch(resource_name, {}).fetch(:order, 'updated_at'),
        params.fetch(resource_name, {}).fetch(:direction, 'desc'),
      )
    end
    
    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information
  end
end
