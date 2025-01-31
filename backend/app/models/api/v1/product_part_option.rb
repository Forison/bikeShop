# frozen_string_literal: true

module Api
  module V1
    class ProductPartOption < ApplicationRecord
      belongs_to :product_part

      validates :name, presence: true
      validates :price, numericality: { greater_than_or_equal_to: 0 }
    end
  end
end
