# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pundit::Authorization

  def current_user
    @current_user ||= find_current_user_from_token
  end

  private

  def authenticate_request
    
    return if current_user

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def find_current_user_from_token
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = Api::V1::JwtService.decode(token)

    return unless decoded_token
    Api::V1::User.find_by(id: decoded_token['user_id'], token: token)
  end

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
  end
end
