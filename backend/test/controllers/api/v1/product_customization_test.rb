# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductCustomizationsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = create(:user_v1, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
        @product = create(:product_v1, user: @user)
        @combination_rule = create(:combination_rule_v1, product: @product)
      end

      # Test for show action when product customization exists
      test 'should show product customization' do
        product_customization = create(:product_customization_v1, user: @user, product: @product)

        get api_v1_product_customization_url(@product.id),
            headers: { Authorization: "Bearer #{@token}" }

        assert_response :success
        json_response = JSON.parse(response.body)
        assert_equal product_customization.id, json_response['id']
      end

      # Test for show action when product customization does not exist
      test 'should return no customizations found' do
        get api_v1_product_customization_url(@product),
            headers: { Authorization: "Bearer #{@token}" }

        assert_response :not_found
        json_response = JSON.parse(response.body)
        assert_equal 'No customizations found', json_response['message']
      end

      # Test for unauthorized access to the create action (without token)
      test 'should return unauthorized without token for create' do
        product_customization_params = {
          product_id: @product.id,
          selected_options: [{ part: 'Part1', option: 'Option1', price: 10.0 }]
        }

        post api_v1_product_customizations_url,
             params: { product_customization: product_customization_params }

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'Unauthorized', json_response['error']
      end
    end
  end
end
