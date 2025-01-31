# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_request

      def me
        render json: @current_user
      end
    end
  end
end
