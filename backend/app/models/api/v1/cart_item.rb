# frozen_string_literal: true

module Api
  module V1
    class CartItem < ApplicationRecord
      belongs_to :cart
      belongs_to :product
      belongs_to :product_customization, optional: true

      after_save :update_cart_total
      after_destroy :update_cart_total

      def item_price
        product_customization&.total_price || product.base_price
      end

      private

      def update_cart_total
        cart.total = cart.cart_items.sum(&:item_price)
        cart.save
      end
    end
  end
end
