# frozen_string_literal: true

# test/models/api/v1/cart_item_test.rb
require 'test_helper'

module Api
  module V1
    class CartItemTest < ActiveSupport::TestCase
      def setup
        @user = create(:user)
        @cart = create(:cart, user: @user)
        @product = create(:product)
        @cart_item = create(:cart_item, cart: @cart, product: @product, product_customization: nil)
      end

      test 'cart_item belongs to cart' do
        assert_respond_to @cart_item, :cart
        assert_equal @cart, @cart_item.cart
      end

      test 'cart_item belongs to product' do
        assert_respond_to @cart_item, :product
        assert_equal @product, @cart_item.product
      end

      test 'cart_item optionally belongs to product_customization' do
        assert_respond_to @cart_item, :product_customization
        assert_nil @cart_item.product_customization
      end
    end
  end
end
