# frozen_string_literal: true

module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      attributes :name, :email, :token, :admin

      def admin
        object.admin?
      end

      def name
        "#{object.last_name} #{object.first_name}"
      end
    end
  end
end
