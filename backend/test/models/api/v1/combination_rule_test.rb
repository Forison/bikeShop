# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CombinationRuleTest < ActiveSupport::TestCase
      def setup
        @product = create(:product) # Assuming you have a factory for product
      end

      test 'should belong to product' do
        combination_rule = create(:combination_rule, product: @product)

        assert_equal @product, combination_rule.product
      end

      test 'should validate presence of prohibited_options' do
        combination_rule = build(:combination_rule, product: @product, prohibited_options: nil)

        assert_not combination_rule.valid?
        assert_includes combination_rule.errors[:prohibited_options], "can't be blank"
      end

      test 'should create combination rule with valid data' do
        combination_rule = build(:combination_rule, product: @product, prohibited_options: 'Some prohibited option')

        assert combination_rule.valid?
      end
    end
  end
end
