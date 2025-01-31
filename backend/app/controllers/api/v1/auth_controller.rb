# frozen_string_literal: true

module Api
  module V1
    class AuthController < ApplicationController
      def register
        user = User.new(user_params)
        if user.save
          render json: { message: 'User created successfully' }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = Api::V1::JwtService.encode(user_id: user.id)
          user[:token] = token
          render json: { user: Api::V1::UserSerializer.new(user) }, status: :ok
        else
          render json: { error: 'email or password is incorrect' }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
      end
    end
  end
end
