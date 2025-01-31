# frozen_string_literal: true

module Api
  module V1
    class CombinationRulesController < ApplicationController
      before_action :authenticate_request
      before_action :set_product, only: :create
      before_action :set_combination_rule, only: %i[show update destroy]
      before_action :authorize_resource, only: %i[update destroy]

      def create
        combination_rule = @product.build_combination_rule(combination_rule_params)
        authorize combination_rule
        if combination_rule.save
          render json: combination_rule, status: :created
        else
          render json: combination_rule.errors, status: :unprocessable_entity
        end
      end

      def update
        if @combination_rule.update(combination_rule_params)
          render json: @combination_rule
        else
          render json: @combination_rule.errors, status: :unprocessable_entity
        end
      end

      def destroy
        if @combination_rule.destroy
          render json: { message: 'Combination rule is was deleted successfully' }, status: :ok
        else
          render json: { errors: @combination_rule.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_product
        @product = Api::V1::Product.find(params[:combination_rule][:product_id])
      end

      def set_combination_rule
        @combination_rule = Api::V1::CombinationRule.find(params[:combination_rule][:id])
      end

      def authorize_resource
        authorize(@combination_rule || CombinationRule)
      end

      def combination_rule_params
        params.require(:combination_rule).permit(:product_id, :condition, :prohibited_options)
      end
    end
  end
end
