# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class CartsControllerTest < ActionDispatch::IntegrationTest
      def setup
        @user = create(:user, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
        @product = create(:product, user: @user)
        @cart = create(:cart, user: @user)
        @cart_item = create(:cart_item, cart: @cart, product: @product, product_customization: nil)
      end

      test 'should get cart items' do
        get api_v1_carts_url, headers: { 'Authorization' => "Bearer #{@token}" }

        assert_response :ok
        cart_items = JSON.parse(response.body)
        assert_equal 1, cart_items.length
      end
    end
  end
end
