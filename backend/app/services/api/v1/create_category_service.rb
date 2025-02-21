# frozen_string_literal: true

module Api
  module V1
    class CreateCategoryService
      def initialize(product_parts, category)
        @product_parts = product_parts || []
        @category = category
      end

      def call
        ActiveRecord::Base.transaction do
          @category.save!
          create_product_part_and_options
        end
        @category
      rescue ActiveRecord::RecordInvalid => e
        Rails.logger.error("Category creation failed: #{e.message}")
        false
      end

      private

      def create_product_part_and_options
        @product_parts.each do |part|
          product_part = @category.product_parts.create!(name: part[:name])
          part[:part_options].each do |part_option|
            product_part.product_part_options.create!(
              name: part_option[:name],
              price: part_option[:price]
            )
          end
        end
      end
    end
  end
end
