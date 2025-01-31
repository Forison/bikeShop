# frozen_string_literal: true

module Api
  module V1
    class PriceCalculatorService
      def initialize(selected_options)
        @selected_options = selected_options
      end

      def call
        calculate_total_price(@selected_options)
      end

      private

      def calculate_total_price(options)
        total_price = options.sum { |option| option['price'].to_f }

        options.each do |selected|
          total_price += apply_price_modifier(selected)
        end

        total_price
      end

      def apply_price_modifier(selected)
        total_modifier = 0

        selected.each do |selected_key, selected_value|
          next if selected_key == 'price'

          price_rule = Api::V1::PriceRule.find_by(
            condition_key: selected_key,
            condition_value: selected_value
          )

          total_modifier += price_rule.price_modifier if price_rule
        end

        total_modifier
      end
    end
  end
end
