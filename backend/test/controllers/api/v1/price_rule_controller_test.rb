# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class PriceRuleControllerTest < ActionDispatch::IntegrationTest
      test 'should get create' do
        get api_v1_price_rule_create_url
        assert_response :success
      end

      test 'should get update' do
        get api_v1_price_rule_update_url
        assert_response :success
      end

      test 'should get destroy' do
        get api_v1_price_rule_destroy_url
        assert_response :success
      end
    end
  end
end
