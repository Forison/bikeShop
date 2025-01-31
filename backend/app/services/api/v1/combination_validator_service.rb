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
        part = selected['part']
        option = selected['option']
        return unless part && option

        check_prohibitions(part, option, prohibitions)
      end

      def check_prohibitions(part, option, prohibitions)
        prohibitions.each do |prohibition|
          next unless prohibition[part] == option

          @errors.add(:combination_rule_violation,
                      "Prohibited option selected: #{part} = #{option}")
          return
        end
      end
    end
  end
end
