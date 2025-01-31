# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class UserTest < ActiveSupport::TestCase
      include FactoryBot::Syntax::Methods

      setup do
        @user = build(:user_v1)
      end

      test 'valid user' do
        assert @user.valid?
      end

      test 'invalid without email' do
        @user.email = nil
        assert_not @user.valid?
        assert_includes @user.errors[:email], "can't be blank"
      end

      test 'invalid with duplicate email' do
        create(:user_v1, email: @user.email)
        assert_not @user.valid?
        assert_includes @user.errors[:email], 'has already been taken'
      end

      test 'invalid with short password' do
        @user.password = 'short'
        @user.password_confirmation = 'short'
        assert_not @user.valid?
        assert_includes @user.errors[:password], 'is too short (minimum is 8 characters)'
      end

      test 'valid with role customer or admin' do
        @user.role = 'admin'
        assert @user.valid?

        @user.role = 'customer'
        assert @user.valid?
      end

      test 'user has many products' do
        assert_respond_to @user, :products
      end

      test 'user has many product_customizations' do
        assert_respond_to @user, :product_customizations
      end

      test 'user has one cart' do
        assert_respond_to @user, :cart
      end
    end
  end
end
