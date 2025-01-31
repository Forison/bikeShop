# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class ProductionConfigurationControllerTest < ActionDispatch::IntegrationTest
      test 'should get create,' do
        get api_v1_production_configuration_create, _url
        assert_response :success
      end

      test 'should get updatedestroy' do
        get api_v1_production_configuration_updatedestroy_url
        assert_response :success
      end
    end
  end
end
