# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductPartTest < ActiveSupport::TestCase
      def setup
        @product = create(:product) # Assuming you have a factory for product
      end

      test 'should belong to product' do
        product_part = create(:product_part, product: @product)

        assert_equal @product, product_part.product
      end

      test 'should have many product_part_options' do
        product_part = create(:product_part, product: @product)
        product_part_option1 = create(:product_part_option, product_part: product_part)
        product_part_option2 = create(:product_part_option, product_part: product_part)

        assert_includes product_part.product_part_options, product_part_option1
        assert_includes product_part.product_part_options, product_part_option2
      end

      test 'should validate presence of name' do
        product_part = build(:product_part, product: @product, name: nil)

        assert_not product_part.valid?
        assert_includes product_part.errors[:name], "can't be blank"
      end

      test 'should create product part with valid attributes' do
        product_part = build(:product_part, product: @product, name: 'Part A')

        assert product_part.valid?
      end
    end
  end
end
