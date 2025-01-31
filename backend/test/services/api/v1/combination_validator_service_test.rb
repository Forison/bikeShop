# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CombinationValidatorServiceTest < ActiveSupport::TestCase
      def setup
        @product = create(:product, :with_combination_rule)
        product_part = create(:product_part, product: @product)
        create(:product_part_option, product_part: product_part)
        @errors = ActiveModel::Errors.new(self)
      end

      def test_valid_selection
        valid_options = [{ 'part' => 'frame', 'option' => 'matte' }]
        service = CombinationValidatorService.new(@product, valid_options, @errors)
        service.call
        assert_empty @errors.messages, 'Expected no errors for valid selection'
      end

      def test_missing_part_or_option
        invalid_options = [{ 'part' => nil, 'option' => 'matte' }]
        service = CombinationValidatorService.new(@product, invalid_options, @errors)
        service.call
        assert_empty @errors.messages, 'Expected no errors when part or option is missing'
      end
    end
  end
end