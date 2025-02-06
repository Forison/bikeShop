# frozen_string_literal: true

module Api
  module V1
    class CartItem < ApplicationRecord
      belongs_to :cart
      belongs_to :product
      belongs_to :product_customization, optional: true

      after_save :update_cart_total, :reduce_product_quantity
      after_destroy :update_cart_total, :restore_product_quantity

      def item_price
        product_customization&.total_price || product.base_price
      end

      def update_cart_total
        cart.cart_items.includes(:product, :product_customization).sum(&:item_price)
        cart.save
      end

      def reduce_product_quantity
        product.quantity -= 1
        product.save
      end

      def restore_product_quantity
        product.quantity += 1
        product.save
      end
    end
  end
end
