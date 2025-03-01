# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      before_action :authenticate_request, except: :index
      before_action :set_product, only: %i[show destroy]
      before_action :authorize_product, only: :destroy

      def index
        @products = Api::V1::Product.includes(:category).all
        render json: @products, status: :ok
      end

      def create
        product = @current_user.products.new(product_params[:product])
        authorize product
        service = ProductCreationService.new(product, product_params)
        if service.call
          render json: product, status: :created
        else
          render json: { errors: 'Product could not be created' }, status: :unprocessable_entity
        end
      end

      def show
        render json: @product, status: :ok
      end

      def destroy
        if @product.destroy
          render json: { message: 'Product was successfully removed' }, status: :ok
        else
          render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_product
        @product = Api::V1::Product.includes(:product_customization, :category).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product not found' }, status: :not_found
      end

      def authorize_product
        authorize @product
      end

      def product_params
        params.permit(
          product: %i[
            id
            name
            category_id
            description
            quantity
            base_price
          ],
          price_rule: [
            part_option: %i[condition_value condition_key price_modifier]
          ],
          combination_rule: [
            :product_id,
            { prohibited_options: %i[part option] }
          ]
        )
      end
    end
  end
end
