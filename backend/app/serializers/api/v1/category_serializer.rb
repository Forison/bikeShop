# frozen_string_literal: true

module Api
  module V1
    class CategorySerializer < ActiveModel::Serializer
      attributes :id, :name, :parts_with_options

      def parts_with_options
        object.product_parts.map do |part|
          {
            id: part.id,
            name: part.name,
            part_options: part.product_part_options.map do |option|
              {
                id: option.id,
                name: option.name,
                price: option.price
              }
            end
          }
        end
      end
    end
  end
end
