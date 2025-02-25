# frozen_string_literal: true

module Api
  module V1
    class ProductCreationService
      def initialize(product, params)
        @product = product
        @params = params
      end

      def call
        ActiveRecord::Base.transaction do
          @product.save!
          return true if @product.not_customizable

          create_price_rules
          create_combination_rules
          add_default_customization
          create_product_base_price
        end
        @product
      rescue ActiveRecord::RecordInvalid => e
        Rails.logger.error("Product creation failed: #{e.message}")
        false
      end

      private

      def create_product_base_price
        base_price = extract_first_part_details.sum { |part| part[:price] }
        @product.update(base_price: base_price)
      end

      def create_price_rules
        @params[:price_rule].each do |rule|
          rule[:part_option].each do |part_option|
            @product.price_rules.create!(
              condition_value: part_option[:condition_value],
              condition_key: part_option[:condition_key],
              price_modifier: part_option[:price_modifier]
            )
          end
        end
      end

      def create_combination_rules
        @params[:combination_rule].each do |rule|
          @product.create_combination_rule!(prohibited_options: rule[:prohibited_options])
        end
      end

      def extract_first_part_details
        @product.category.product_parts.includes(:product_part_options).map do |part|
          first_option = part.product_part_options.first
          {
            part: part.name,
            option: first_option&.name,
            price: first_option&.price || 0
          }
        end
      end

      def add_default_customization
        Api::V1::ProductCustomization.create!({
                                                user_id: @product.user.id,
                                                product_id: @product.id,
                                                selected_options: extract_first_part_details,
                                                total_price: create_product_base_price
                                              })
      end
    end
  end
end
