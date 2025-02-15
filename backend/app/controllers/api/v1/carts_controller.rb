# frozen_string_literal: true

module Api
  module V1
    class CartsController < ApplicationController
      before_action :authenticate_request

      def index
        # debugger
        cart_items = @current_user.cart.cart_items.includes(:product,
                                                            :product_customization) || []
        render json: cart_items, status: :ok
      end
    end
  end
end
