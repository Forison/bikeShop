# frozen_string_literal: true

module Api
  module V1
    class PartOptionMismatchService
      def initialize(selected_options, errors)
        @selected_options = selected_options
        @errors = errors
      end

      def call
        options = @selected_options
        options.each do |product|
          product_part = find_product_part(product)
          product_part_option = find_product_part_option(product_part, product)
          return handle_missing_option_error(product) if product_part_option.nil?
        end
      end

      private

      def find_product_part(product)
        Api::V1::ProductPart.find_by(name: product['part'])
      end

      def find_product_part_option(product_part, product)
        product_part&.product_part_options&.find_by(name: product['option'])
      end

      def handle_missing_option_error(product)
        @errors.add(:stock_status,
                    "The part #{product['part']} is not an option for #{product['option']}.")
      end
    end
  end
end
