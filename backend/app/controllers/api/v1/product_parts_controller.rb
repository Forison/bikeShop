# frozen_string_literal: true

module Api
  module V1
    class ProductPartsController < ApplicationController
      before_action :authenticate_request
      before_action :set_product_part, only: %i[update destroy]
      before_action :set_product, only: :create
      before_action :authorize_resource, only: %i[update destroy create]

      def create
        product_part = @product.product_parts.new(product_part_params)
        authorize product_part
        if product_part.save
          render json: product_part, status: :created
        else
          render json: { errors: product_part.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @product_part.update(product_part_params)
          render json: @product_part, status: :ok
        else
          render json: { errors: @product_part.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @product_part.destroy
          render json: { message: 'Product part deleted successfully' }, status: :ok
        else
          render json: { errors: @product_part.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def authorize_resource
        authorize(@product_part || ProductPart)
      end

      def set_product_part
        @product_part = ProductPart.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render_error('Product part not found', :not_found)
      end

      def set_product
        @product = Product.find(params[:product_part][:product_id])
      rescue ActiveRecord::RecordNotFound
        render_error('Product not found', :not_found)
      end

      def product_part_params
        params.require(:product_part).permit(:name, :product_id)
      end
    end
  end
end
