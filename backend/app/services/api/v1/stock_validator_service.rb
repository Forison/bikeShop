# frozen_string_literal: true

module Api
  module V1
    class StockValidatorService
      def initialize(selected_options, errors)
        @selected_options = selected_options
        @errors = errors
      end

      def call
        options = @selected_options
        options.each do |product|
          product_part = find_product_part(product)
          product_part_option = find_product_part_option(product_part, product)
          if product_part_option.nil?
            return handle_missing_option_error(product)
          end
          if out_of_stock?(product_part_option)
            return handle_out_of_stock_error(product)
          end
        end
      end

      private

      def find_product_part(product)
        Api::V1::ProductPart.find_by(name: product['part'])
      end

      def find_product_part_option(product_part, product)
        product_part&.product_part_options&.find_by(name: product['option'])
      end

      def out_of_stock?(product_part_option)
        product_part_option.quantity <= 0
      end

      def handle_missing_option_error(product)
        @errors.add(:stock_status,
                    "The part #{product['part']} is not an option for #{product['option']}.")
      end

      def handle_out_of_stock_error(product)
        @errors.add(:stock_status_violation,
                    "The option #{product['option']} is currently out of stock.")
      end
    end
  end
end
