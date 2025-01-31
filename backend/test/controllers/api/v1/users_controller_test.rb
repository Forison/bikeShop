# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class UsersControllerTest < ActionDispatch::IntegrationTest
      test 'should get me' do
        get api_v1_users_me_url
        assert_response :success
      end
    end
  end
end
