# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class PriceRuleTest < ActiveSupport::TestCase
      def setup
        @product = create(:product)
      end

      test 'should belong to product' do
        price_rule = create(:price_rule, product: @product)

        assert_equal @product, price_rule.product
      end

      test 'should create price rule with valid data' do
        price_rule = build(:price_rule, product: @product)

        assert price_rule.valid?
      end

      test 'should not be valid without a product' do
        price_rule = build(:price_rule, product: nil)

        assert_not price_rule.valid?
        assert_includes price_rule.errors[:product], 'must exist'
      end
    end
  end
end
