# frozen_string_literal: true

module Api
  module V1
    class OrderItem < ApplicationRecord
      belongs_to :order
      belongs_to :product
      belongs_to :product_customization, optional: true

      validates :quantity, numericality: { greater_than: 0 }
      validates :price, numericality: { greater_than_or_equal_to: 0 }
    end
  end
end
