# frozen_string_literal: true

module Api
  module V1
    class CombinationValidatorService
      def initialize(product, selected_options, errors)
        @product = product
        @selected_options = selected_options
        @errors = errors
      end

      def call
        prohibitions = @product.combination_rule.prohibited_options
        @selected_options.each { |selected| validate_option(selected, prohibitions) }
      end

      private

      def validate_option(selected, prohibitions)
        selected.each do |key, value|
          next if key == 'price'

          check_prohibitions(key, value, prohibitions)
        end
      end

      def check_prohibitions(key, value, prohibitions)
        prohibitions.each do |prohibition|
          if prohibition.key?(key) && prohibition[key].include?(value)
            return @errors.add(:combination_rule_violation,
                               "Prohibited option selected: #{key} = #{value}")
          end
        end
      end
    end
  end
end
