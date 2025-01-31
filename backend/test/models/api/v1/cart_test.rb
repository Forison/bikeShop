# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CartTest < ActiveSupport::TestCase
      def setup
        # @user = create(:user)
        # @cart = create(:cart, user: @user)
        # @product = create(:product, base_price: 10.0)

        @user = create(:user)
        @cart = create(:cart, user: @user)

        @product = create(:product)
        @combination_rule = create(:combination_rule, product_id: @product.id)
        @cart_item = create(:cart_item, cart: @cart, product: @product, product_customization: nil)
      end

      test 'cart belongs to a user' do
        assert_respond_to @cart, :user
        assert_equal @user, @cart.user
      end

      test 'cart must have a user' do
        invalid_cart = Cart.new
        assert_not invalid_cart.valid?
        assert_includes invalid_cart.errors[:user], 'must exist'
      end
    end
  end
end
