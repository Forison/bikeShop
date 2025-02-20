# frozen_string_literal: true

module Api
  module V1
    class JwtService
      SECRET_KEY = Rails.application.credentials.secret_key_base.to_s

      def self.encode(payload, exp = 24.hours.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
      end

      def self.decode(token)
        decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
        decoded.first
      rescue JWT::ExpiredSignature, JWT::DecodeError
        nil
      end
    end
  end
end
