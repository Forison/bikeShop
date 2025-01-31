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

      validates :role, inclusion: { in: %w[admin customer], message: '%<value>s is not a valid role' }

      enum role: { customer: 'customer', admin: 'admin' }, _default: :customer
    end
  end
end
