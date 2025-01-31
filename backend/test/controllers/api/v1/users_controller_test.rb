# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class UsersControllerTest < ActionDispatch::IntegrationTest
      include FactoryBot::Syntax::Methods

      setup do
        @user = create(:user_v1, password: 'password', password_confirmation: 'password')
        post api_v1_login_url, params: { email: @user.email, password: 'password' }
        json_response = JSON.parse(response.body)
        @token = json_response['user']['token']
      end

      test 'should return current user when authenticated' do
        get api_v1_me_url, headers: { Authorization: "Bearer #{@token}" }

        assert_response :success
        json_response = JSON.parse(response.body)
        assert_equal @user.email, json_response['email']
      end

      test 'should return unauthorized without token' do
        get api_v1_me_url

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'Unauthorized', json_response['error']
      end
    end
  end
end
