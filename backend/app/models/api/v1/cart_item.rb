# frozen_string_literal: true

module Api
  module V1
    class CartItem < ApplicationRecord
      default_scope { order(created_at: :desc) }
      belongs_to :cart
      belongs_to :product
      belongs_to :product_customization, optional: true
      after_save :update_cart_total
      after_destroy :update_cart_total

      def item_price
        product_customization&.total_price || product.base_price
      end

      def update_cart_total
        cart.total = cart.cart_items.includes(:product, :product_customization).sum(&:item_price)
        cart.save
      end

      def price_rule
        selected_customization_parts&.map do |selected_option|
          Api::V1::PriceRule.find_by(condition_key: selected_option['part'], condition_value: selected_option['option'])
        end&.compact
      end

      def selected_customization_parts
        product_customization&.selected_options
      end
    end
  end
end
