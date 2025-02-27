# frozen_string_literal: true

module Api
  module V1
    class OrdersController < ApplicationController
      before_action :authenticate_request

      def create
        cart = @current_user.cart
        order = CheckoutService.new(cart).call

        if order
          render json: order, status: :created
        else
          render json: { error: order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        order = @current_user.orders.find_by(id: params[:id])

        if order
          render json: order, status: :ok
        else
          render json: { error: 'Order not found' }, status: :not_found
        end
      end

      def index
        orders = @current_user.orders.order(created_at: :desc)
        render json: orders, status: :ok
      end
    end
  end
end
