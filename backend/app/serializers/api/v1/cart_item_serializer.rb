# frozen_string_literal: true

module Api
  module V1
    class CartItemSerializer < ActiveModel::Serializer
      attributes :cart_item_id, :cart_item, :cart_item_price_summation

      def cart_item
        product = object.product
        {
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          quantity: product.quantity,
          base_price: calculate_base_price(product)
        }
      end

      def cart_item_price_summation
        object.cart.total
      end

      def cart_item_id
        object.id
      end

      private

      def calculate_base_price(product)
        object.product_customization&.total_price || product.base_price
      end
    end
  end
end
