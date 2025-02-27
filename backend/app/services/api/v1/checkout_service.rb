# frozen_string_literal: true

module Api
  module V1
    class CheckoutService
      def initialize(cart)
        @cart = cart
        @user = cart.user
      end

      def call
        return unless @cart.cart_items.exists?

        ActiveRecord::Base.transaction do
          order = create_order
          move_cart_items_to_order(order)
          clear_cart
          order
        end
      rescue StandardError => e
        Rails.logger.error "Checkout failed: #{e.message}"
        false
      end

      private

      def create_order
        @user.orders.create!(
          total: @cart.total,
          status: 'pending'
        )
      end

      def move_cart_items_to_order(order)
        @cart.cart_items.each do |cart_item|
          order.order_items.create!(
            product: cart_item.product,
            product_customization: cart_item.product_customization,
            quantity: cart_item.quantity,
            price: cart_item.product.price
          )
        end
      end

      def clear_cart
        @cart.cart_items.destroy_all
        @cart.update!(total: 0.00)
      end
    end
  end
end
