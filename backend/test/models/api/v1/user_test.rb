# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class UserTest < ActiveSupport::TestCase
      def setup
        @user = create(:user)
      end

      test 'should have many products' do
        product1 = create(:product, user: @user)
        product2 = create(:product, user: @user)

        assert_includes @user.products, product1
        assert_includes @user.products, product2
      end

      test 'should have one cart' do
        cart = create(:cart, user: @user)

        assert_equal @user.cart, cart
      end

      test 'should validate presence of email' do
        user_without_email = build(:user, email: nil)

        assert_not user_without_email.valid?
        assert_includes user_without_email.errors[:email], "can't be blank"
      end

      test 'should validate uniqueness of email' do
        create(:user, email: 'test@example.com')
        user_with_duplicate_email = build(:user, email: 'test@example.com')

        assert_not user_with_duplicate_email.valid?
        assert_includes user_with_duplicate_email.errors[:email], 'has already been taken'
      end

      test 'should validate password length (minimum 8 characters)' do
        user_with_short_password = build(:user, password: 'short')

        assert_not user_with_short_password.valid?
        assert_includes user_with_short_password.errors[:password], 'is too short (minimum is 8 characters)'
      end

      test 'should create a user with valid attributes' do
        user = build(:user, email: 'test@example.com', password: 'password123', role: 'customer')

        assert user.valid?
      end
    end
  end
end
