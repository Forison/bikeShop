# frozen_string_literal: true

module Api
  module V1
    class ProductPartOptionPolicy < ApplicationPolicy
      def create?
        user.admin?
        true
      end

      def update?
        create?
      end

      def destroy?
        create?
      end
    end
  end
end
