# frozen_string_literal: true

module Api
  module V1
    class ProductSerializer < ActiveModel::Serializer
      attributes :id, :name, :category, :base_price, :description, :quantity, :product_parts, :product_part_options

      def product_parts
        object.product_parts.map do |part|
          {
            id: part.id,
            name: part.name
          }
        end
      end

      def product_part_options
        object.product_part_options.map do |part|
          {
            id: part.id,
            name: part.name,
            quantity: part.quantity,
            price: part.price
          }
        end
      end
    end
  end
end
