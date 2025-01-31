# frozen_string_literal: true

module Api
  module V1
    class CartItemPolicy < ApplicationPolicy
      def create?
        user.customer? || user.admin?
      end
      # class Scope < ApplicationPolicy::Scope
      # end
    end
  end
end
