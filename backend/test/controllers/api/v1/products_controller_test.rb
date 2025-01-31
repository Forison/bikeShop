# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = create(:user, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
        @product = create(:product, user: @user)
      end

      test 'should get index' do
        get api_v1_products_url

        assert_response :success
        json_response = JSON.parse(response.body)

        assert_includes json_response.map { |product| product['id'] }, @product.id
      end

      test 'should show product' do
        get api_v1_product_url(@product), headers: { Authorization: "Bearer #{@token}" }

        assert_response :success
        json_response = JSON.parse(response.body)
        assert_equal @product.id, json_response['id']
      end

      test 'should destroy product' do
        assert_difference 'Product.count', -1  do
          delete api_v1_product_url(@product), headers: { Authorization: "Bearer #{@token}" }
        end

        assert_response :success
        json_response = JSON.parse(response.body)
        assert_equal 'Product was successfully removed', json_response['message']
      end

      test 'should return unauthorized without token for create' do
        post api_v1_products_url, params: { product: { name: 'Product' } }

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'Unauthorized', json_response['error']
      end

      test 'should return unauthorized without token for show' do
        get api_v1_product_url(@product)

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'Unauthorized', json_response['error']
      end

      test 'should return unauthorized without token for destroy' do
        delete api_v1_product_url(@product)

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'Unauthorized', json_response['error']
      end

      test 'should return errors for invalid product creation' do
        invalid_product_params = { name: '', category: '', description: '' }

        post api_v1_products_url,
             headers: { Authorization: "Bearer #{@token}" },
             params: { product: invalid_product_params }

        assert_response :unprocessable_entity
        json_response = JSON.parse(response.body)
        assert_includes json_response['errors'], "Name can't be blank"
      end
    end
  end
end
