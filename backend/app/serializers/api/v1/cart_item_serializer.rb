# frozen_string_literal: true

module Api
  module V1
    class CartItemSerializer < ActiveModel::Serializer
      attributes :cart_item_id, :cart_item, :cart_item_price_summation

      def cart_item
        {
          id: object.product.id,
          name: object.product.name,
          category: object.product.category,
          description: object.product.description,
          quantity: object.product.quantity,
          base_price: object.product.product_customization&.total_price || object.product.base_price
        }
      end

      def cart_item_price_summation
        object.cart.total
      end

      def cart_item_id
        object.id
      end
    end
  end
end
