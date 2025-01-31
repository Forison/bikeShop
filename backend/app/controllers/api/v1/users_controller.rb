# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_request

      def me
        cache_key = "user_#{@current_user.id}_data"

        cached_user = Rails.cache.fetch(cache_key, expires_in: 10.minutes) do
          @current_user
        end

        render json: cached_user
      end
    end
  end
end
