# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CartItemsControllerTest < ActionDispatch::IntegrationTest
      def setup
        @user = create(:user_v1, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
        @product = create(:product_v1, user: @user)
        @cart = @user.cart || @user.create_cart
        @valid_params = { cart_item_v1: { product_id: @product.id } }
        @invalid_params = { cart_item_v1: { product_id: nil } }
        @cart_item = create(:cart_item_v1, cart: @cart, product: @product)

        @auth_headers = { 'Authorization' => "Bearer #{@token}" }
      end

      test 'should destroy cart item' do
        delete api_v1_cart_item_url(@cart_item), headers: @auth_headers
        puts response.body

        assert_response :ok
        assert_equal 'Cart item removed successfully', json_response['message']
        assert_nil Api::V1::CartItem.find_by(id: @cart_item.id)
      end

      test 'should return error if cart item not found' do
        delete api_v1_cart_item_url(id: -1), headers: @auth_headers
        puts response.body

        assert_response :not_found
        assert_equal 'Cart item not found', json_response['error']
      end

      private

      def json_response
        JSON.parse(response.body)
      end
    end
  end
end
