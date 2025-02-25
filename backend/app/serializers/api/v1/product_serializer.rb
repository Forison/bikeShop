# frozen_string_literal: true

module Api
  module V1
    class ProductSerializer < ActiveModel::Serializer
      attributes :id, :name, :category, :base_price, :description, :quantity, :not_customizable, :product_parts,
                 :product_part_options

      def product_parts
        object.category.product_parts.map do |part|
          {
            id: part.id,
            name: part.name
          }
        end
      end

      def product_part_options
        object.category.product_part_options.map do |part|
          {
            id: part.id,
            name: part.name,
            price: part.price
          }
        end
      end
    end
  end
end
