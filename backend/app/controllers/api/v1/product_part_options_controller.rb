# frozen_string_literal: true

module Api
  module V1
    class ProductPartOptionsController < ApplicationController
      before_action :authenticate_request
      before_action :set_product_part_options, only: %i[update destroy]
      before_action :set_product_part, only: :create
      before_action :authorize_resource

      def create
        product_part_option = @product_part.product_part_options.new(product_part_option_params)
        authorize product_part_option
        if product_part_option.save
          render_success('Product part added successfully', product_part_option, :created)
        else
          render_errors(product_part_option.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        if @product_part_options.update(product_part_option_params)
          render_success('Product option has been updated', @product_part_options)
        else
          render json: { errors: @product_part_options.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @product_part_options.destroy
          render json: { message: 'Product part options deleted successfully' }, status: :ok
        else
          render json: { errors: @product_part_options.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def render_success(message, resource = nil, status = :ok)
        if resource
          render json: resource, serializer: Api::V1::ProductPartOptionSerializer, status: status
        else
          render json: { message: message }, status: status
        end
      end

      def set_product_part_options
        @product_part_options = Api::V1::ProductPartOption.find(params[:product_part_options][:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product part options not found' }, status: :not_found
      end

      def authorize_resource
        authorize(@product_part_options || ProductPartOption)
      end

      def set_product_part
        @product_part = Api::V1::ProductPart.find(params[:product_part_options][:product_part_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product part options not found' }, status: :not_found
      end

      def product_part_option_params
        params.require(:product_part_options).permit(:name, :price, :product_part_id, :quantity)
      end
    end
  end
end
