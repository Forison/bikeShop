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
          @product.save
          create_product_parts
          create_product_base_price
          create_price_rules
          create_combination_rules
        end
      rescue ActiveRecord::RecordInvalid => e
        raise ActiveRecord::Rollback, e.message
      end

      private

      def create_product_base_price
        base_price = @params[:product_parts].sum { |part| part[:part_options].first[:price] }
        @product.update(base_price: base_price)
      end

      def create_product_parts
        @params[:product_parts].each do |part_data|
          product_part = @product.product_parts.create(name: part_data[:name])
          part_data[:part_options].each do |option_params|
            product_part.product_part_options.create(
              name: option_params[:name],
              price: option_params[:price],
              quantity: option_params[:quantity]
            )
          end
        end
      end

      def create_price_rules
        @params[:price_rule][:part_option].each do |rule|
          @product.create_price_rule(condition_value: rule[:condition_value],
                                     condition_key: rule[:condition_key],
                                     price_modifier: rule[:price_modifier])
        end
      end

      def create_combination_rules
        @product.create_combination_rule(prohibited_options: @params[:combination_rule][:prohibited_options])
      end
    end
  end
end
