# frozen_string_literal: true

module Api
  module V1
    class AuthController < ApplicationController
      before_action :authenticate_request, only: :logout

      def register
        user = User.new(user_params)
        if user.save
          auth_user(user)
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          auth_user(user)
        else
          render json: { error: 'email or password is incorrect' }, status: :unauthorized
        end
      end

      def logout
        if current_user
          current_user.update!(token: nil)
          render json: { message: 'Successfully logged out' }, status: :ok
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def auth_user(user)
        token = Api::V1::JwtService.encode(user_id: user.id)
        user[:token] = token
        user.save
        render json: { user: Api::V1::UserSerializer.new(user) }, status: :ok
      end

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
      end
    end
  end
end
