# frozen_string_literal: true

module Api
  module V1
    class OrderCreationService
      Result = Struct.new(:success?, :data, :errors)

      def initialize(user)
        @user = user
        @cart = user.cart
      end

      def call
        return failure(['Cart is empty']) if @cart.cart_items.empty?

        order = create_order
        create_order_items(order)
        clear_cart

        success(order)
      rescue StandardError => e
        failure([e.message])
      end

      private

      def create_order
        @user.orders.create!(
          total_price: @cart.cart_items.sum { |item| item.price * item.quantity },
          status: 'pending'
        )
      end

      def create_order_items(order)
        @cart.cart_items.each do |cart_item|
          order.order_items.create!(
            product: cart_item.product,
            quantity: cart_item.quantity,
            price: cart_item.price
          )
        end
      end

      def clear_cart
        @cart.cart_items.destroy_all
      end

      def success(data)
        Result.new(true, data, nil)
      end

      def failure(errors)
        Result.new(false, nil, errors)
      end
    end
  end
end
