# frozen_string_literal: true

module Api
  module V1
    class CategoryPolicy < ApplicationPolicy
      def create?
        user.admin?
      end
    end
  end
end
