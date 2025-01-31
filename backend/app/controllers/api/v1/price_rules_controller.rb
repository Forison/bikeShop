# frozen_string_literal: true

module Api
  module V1
    class PriceRulesController < ApplicationController
      before_action :authenticate_request
      before_action :set_price_rule, only: %i[update destroy]
      before_action :authorize_resource, only: %i[update destroy create]
      before_action :set_product, only: :create

      def create
        price_rule = @product.build_price_rule(price_rule_params)
        authorize price_rule
        if price_rule.save
          render json: price_rule, status: :created
        else
          render json: { errors: price_rule.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @price_rule.update(price_rule_params)
          render json: @price_rule, status: :ok
        else
          render json: { errors: @price_rule.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @price_rule.destroy
          render json: { message: 'Price rule deleted successfully' }, status: :ok
        else
          render json: { errors: @price_rule.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_product
        @product = Api::V1::Product.find_by(id: params[:price_rule][:product_id])
        return if @product

        render json: { errors: ['Price rule not found'] }, status: :not_found
      end

      def authorize_resource
        authorize(@price_rule || PriceRule)
      end

      def set_price_rule
        @price_rule = Api::V1::PriceRule.find_by(id: params[:id])
        return if @price_rule

        render json: { errors: ['Price rule not found'] }, status: :not_found
      end

      def price_rule_params
        params.require(:price_rule).permit(:product_id, :condition_key, :condition_value, :price_modifier)
      end
    end
  end
end
