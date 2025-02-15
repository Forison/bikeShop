# frozen_string_literal: true

module Api
  module V1
    class ProductCustomization < ApplicationRecord
      belongs_to :product
      belongs_to :user
      has_many :cart_items, dependent: :nullify

      validates :selected_options, presence: true
      validate :part_mismatch, :validate_combinations

      before_save :calculate_total_price

      def calculate_total_price
        total_price = Api::V1::PriceCalculatorService.new(selected_options, errors).call
        self.total_price = total_price
      end

      def part_mismatch
        Api::V1::PartOptionMismatchService.new(selected_options, errors).call
      end

      def validate_combinations
        Api::V1::CombinationValidatorService.new(product, selected_options, errors).call
      end
    end
  end
end
