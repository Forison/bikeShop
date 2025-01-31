# frozen_string_literal: true

module Api
  module V1
    class User < ApplicationRecord
      has_many :products, dependent: :destroy
      has_many :product_customizations, dependent: :destroy
      has_one :cart

      has_secure_password
      validates :email, presence: true, uniqueness: true
      validates :password, length: { minimum: 8 }, allow_nil: true

      enum :role, { customer: 'customer', admin: 'admin' }
      after_initialize :set_default_role, if: :new_record?

      def set_default_role
        self.role ||= :customer
      end
    end
  end
end
