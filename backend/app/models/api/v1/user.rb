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
      validates :last_name, :first_name, :date_of_birth, presence: true
      enum :role, { customer: 'customer', admin: 'admin' }
    end
  end
end
