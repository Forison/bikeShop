# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductPartOptionTest < ActiveSupport::TestCase
      def setup
        @product_part = create(:product_part)
      end

      test 'should belong to product_part' do
        product_part_option = create(:product_part_option, product_part: @product_part)

        assert_equal @product_part, product_part_option.product_part
      end

      test 'should validate presence of name' do
        product_part_option = build(:product_part_option, product_part: @product_part, name: nil)

        assert_not product_part_option.valid?
        assert_includes product_part_option.errors[:name], "can't be blank"
      end

      test 'should validate numericality of price' do
        product_part_option = build(:product_part_option, product_part: @product_part, price: -1)

        assert_not product_part_option.valid?
        assert_includes product_part_option.errors[:price], 'must be greater than or equal to 0'
      end

      test 'should create product part option with valid attributes' do
        product_part_option = build(:product_part_option, product_part: @product_part, name: 'Option A', price: 10.00)

        assert product_part_option.valid?
      end
    end
  end
end
