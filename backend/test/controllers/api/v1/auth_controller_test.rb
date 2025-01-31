# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class AuthControllerTest < ActionDispatch::IntegrationTest
      include FactoryBot::Syntax::Methods

      setup do
        @user = create(:user, email: Faker::Internet.unique.email, password: 'password123',
                              password_confirmation: 'password123')
      end

      test 'should register a new user' do
        user_params = {
          name: Faker::Name.name,
          email: Faker::Internet.unique.email,
          password: 'password123',
          password_confirmation: 'password123',
          role: %w[admin customer].sample
        }

        assert_difference('User.count', 1) do
          post api_v1_register_url, params: { user: user_params }, as: :json
        end

        assert_response :created
        json_response = JSON.parse(response.body)
        assert_equal 'User created successfully', json_response['message']
      end

      test 'should not register a user with invalid data' do
        invalid_params = {
          name: '',
          email: 'invalid_email',
          password: 'short',
          password_confirmation: 'mismatch'
        }

        post api_v1_register_url, params: { user: invalid_params }, as: :json

        assert_response :unprocessable_entity
        json_response = JSON.parse(response.body)
        assert json_response['errors'].present?
      end

      test 'should log in a user with correct credentials' do
        post api_v1_login_url, params: { email: @user.email, password: 'password123' }, as: :json

        assert_response :success
        json_response = JSON.parse(response.body)
        assert json_response['user']['token'].present?
      end

      test 'should not log in with incorrect credentials' do
        post api_v1_login_url, params: { email: @user.email, password: 'wrongpassword' }, as: :json

        assert_response :unauthorized
        json_response = JSON.parse(response.body)
        assert_equal 'email or password is incorrect', json_response['error']
      end
    end
  end
end
