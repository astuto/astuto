module Admin
  class BoardsController < Admin::ApplicationController
    before_action :default_order

    def default_order
      @order ||= Administrate::Order.new(
        params.fetch(resource_name, {}).fetch(:order, 'order'),
        params.fetch(resource_name, {}).fetch(:direction, 'asc'),
      )
    end

    def find_resource(param)
      Board.find_by!(slug: param)
    end
  end
end
