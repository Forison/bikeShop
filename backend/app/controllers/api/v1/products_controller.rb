# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      before_action :authenticate_request, except: :index
      before_action :set_product, only: %i[show update destroy add_part]
      before_action :authorize_product, only: %i[update destroy]

      def index
        @products = Product.all
        render json: @products, status: :ok
      end

      def create
        product = @current_user.products.new(product_params)
        authorize product
        if product.save
          service = ProductCreationService.new(product, params)

          if service.call
            render json: product, status: :created
          else
            render json: { errors: 'Failed to create associated data' }, status: :unprocessable_entity
          end
        else
          render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        render json: @product, status: :ok
      end

      def update
        if @product.update(product_params)
          render json: @product, status: :ok
        else
          render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
        end
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
        @product = Product.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product not found' }, status: :not_found
      end

      def authorize_product
        authorize @product
      end

      def product_params
        params.require(:product).permit(
          :id,
          :name,
          :category,
          :description,
          product_part: [:part, { part_options: %i[part_option price] }],
          price_rule: [part_option: %i[condition_value condition_key price_modifier]],
          combination_rule: [:product_id, { prohibited_options: %i[part option] }]
        )
      end
    end
  end
end
