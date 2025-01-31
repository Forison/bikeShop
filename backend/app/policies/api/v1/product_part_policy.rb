# frozen_string_literal: true

module Api
  module V1
    class ProductPartPolicy < ApplicationPolicy
      def create?
        user.admin?
      end

      def update?
        create?
      end

      def destroy?
        create?
      end

      # class Scope < ApplicationPolicy::Scope
      # end
    end
  end
end
