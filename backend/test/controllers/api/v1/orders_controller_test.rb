# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class OrdersControllerTest < ActionDispatch::IntegrationTest
      test 'should get show' do
        get api_v1_orders_show_url
        assert_response :success
      end

      test 'should get index' do
        get api_v1_orders_index_url
        assert_response :success
      end
      test 'should get index' do
        get api_v1_orders_index_url
        assert_response :success
      end
    end
  end
end
