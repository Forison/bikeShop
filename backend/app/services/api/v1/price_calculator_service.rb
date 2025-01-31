# frozen_string_literal: true

module Api
  module V1
    class PriceCalculatorService
      def initialize(selected_options, errors)
        @selected_options = selected_options
        @errors = errors
      end

      def call
        calculate_total_price(@selected_options)
      end

      private

      def calculate_total_price(options)
        total_modifier = 0
        total_price = options.sum { |option| option['price'].to_f }

        options.each do |selected|
          price_rule = Api::V1::PriceRule.find_by(
            condition_key: selected['part'],
            condition_value: selected['option']
          )

          total_modifier += price_rule.price_modifier if price_rule
        end
        total_price + total_modifier.to_f
      end
    end
  end
end
