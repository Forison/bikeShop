# frozen_string_literal: true

module Api
  module V1
    class ProductCustomizationsController < ApplicationController
      before_action :authenticate_request
      before_action :set_product, only: :create

      def create
        return if handle_available_selected_options

        product_customization = @current_user.product_customizations.find_or_initialize_by(
          product_id: product_customization_params[:product_id]
        )

        product_customization.assign_attributes(product_customization_params)

        authorize product_customization

        if product_customization.save
          status = product_customization.persisted? ? :ok : :created
          render json: product_customization, status: status
        else
          render json: { errors: product_customization.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        product_customization = Api::V1::ProductCustomization.find_by(product_id: params[:id]) || []
        if product_customization
          render json: product_customization, status: :ok
        else
          render json: { message: 'No customizations found' }, status: :not_found
        end
      end

      private

      def empty_selected_options?
        params[:selected_options].blank? || params[:selected_options].all? do |option|
          option['part'].blank? && option['option'].blank? && option['price'].to_f.zero?
        end
      end

      def set_product
        @product = Product.find(params[:product_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product not found' }, status: :not_found
      end

      def handle_available_selected_options
        if empty_selected_options?
          @product.update(product_customization: nil)
          render json: { message: 'Selected options for customization are emptied' }, status: :ok
          return true
        end
        false
      end

      def product_customization_params
        params.require(:product_customization).permit(:product_id, :user_id, selected_options: %i[part option price])
      end
    end
  end
end
