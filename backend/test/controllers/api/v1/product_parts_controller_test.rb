# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductPartsControllerTest < ActionDispatch::IntegrationTest
      test 'should get index' do
        get api_v1_product_parts_index_url
        assert_response :success
      end

      test 'should get show' do
        get api_v1_product_parts_show_url
        assert_response :success
      end

      test 'should get update' do
        get api_v1_product_parts_update_url
        assert_response :success
      end

      test 'should get destroy' do
        get api_v1_product_parts_destroy_url
        assert_response :success
      end
    end
  end
end
