# frozen_string_literal: true

# test/models/api/v1/product_test.rb
require 'test_helper'

module Api
  module V1
    class ProductTest < ActiveSupport::TestCase
      # Test associations
      def test_belongs_to_user
        user = create(:user)
        product = build(:product, user: user)
        assert_equal user, product.user
      end

      def test_has_many_product_parts
        product = build(:product)
        assert_respond_to product, :product_parts
      end

      def test_has_many_product_part_options
        product = build(:product)
        assert_respond_to product, :product_part_options
      end

      def test_has_one_combination_rule
        product = build(:product)
        assert_respond_to product, :combination_rule
      end

      def test_has_one_price_rule
        product = build(:product)
        assert_respond_to product, :price_rule
      end

      def test_has_one_product_customization
        product = build(:product)
        assert_respond_to product, :product_customization
      end

      # Test validations
      def test_should_not_save_product_without_name
        product = build(:product, name: nil)
        assert_not product.valid?
        assert_includes product.errors[:name], "can't be blank"
      end

      def test_should_not_save_product_without_category
        product = build(:product, category: nil)
        assert_not product.valid?
        assert_includes product.errors[:category], "can't be blank"
      end

      def test_should_save_product_with_valid_attributes
        product = build(:product)
        assert product.valid?
      end
    end
  end
end
