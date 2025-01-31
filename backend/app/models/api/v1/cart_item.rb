# frozen_string_literal: true

module Api
  module V1
    class CartItem < ApplicationRecord
      belongs_to :cart
      belongs_to :product

      after_save :add_item_price_to_cart_total
      after_destroy :remove_item_price_from_total

      def add_item_price_to_cart_total
        cart.total += product.product_customization&.total_price || product.base_price
        cart.save
      end

      def remove_item_price_from_total
        cart.total -= product.product_customization&.total_price || product.base_price
        cart.save
      end
    end
  end
end
