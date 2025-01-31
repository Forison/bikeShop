# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CartsControllerTest < ActionDispatch::IntegrationTest
      def setup
        @user = create(:user_v1, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
        @product = create(:product_v1, user: @user)
      end

      test 'should get cart items' do
        get api_v1_cart_items_url, headers: { 'Authorization' => "Bearer #{@token}" }

        assert_response :ok
        cart_items = JSON.parse(response.body)
        assert_equal 1, cart_items.length
        assert_equal @cart_item.product_name, cart_items.first['product_name']
        assert_equal @cart_item.quantity, cart_items.first['quantity']
      end
    end
  end
end
