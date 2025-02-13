# frozen_string_literal: true

module Api
  module V1
    class ProductCustomization < ApplicationRecord
      belongs_to :product
      belongs_to :user
      has_many :cart_items, dependent: :nullify

      validates :selected_options, presence: true
      validate :validate_stock, :validate_combinations

      before_save :calculate_total_price

      def calculate_total_price
        total_price = Api::V1::PriceCalculatorService.new(selected_options, errors).call
        self.total_price = total_price
      end

      def validate_stock
        Api::V1::StockValidatorService.new(selected_options, errors).call
      end

      def validate_combinations
        Api::V1::CombinationValidatorService.new(product, selected_options, errors).call
      end
    end
  end
end
