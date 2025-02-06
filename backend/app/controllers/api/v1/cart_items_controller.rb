# frozen_string_literal: true

module Api
  module V1
    class CartItemsController < ApplicationController
      before_action :authenticate_request
      before_action :set_cart
      before_action :find_cart_item, only: :destroy
      before_action :find_product, only: :create

      def create
        cart_item = @cart.cart_items.includes(:product, :product_customization).new(cart_item_params)

        cart_item.product_customization = Api::V1::ProductCustomization.find_by(
          id: params[:cart_item][:product_customization_id],
          user_id: @current_user.id
        )

        if cart_item.save
          render json: cart_item, status: :created
        else
          render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @cart_item.includes(:product, :product_customization).destroy
          render json: { message: 'Cart item removed successfully' }, status: :ok
        else
          render json: { errors: @cart_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def find_product
        @product = Api::V1::Product.find_by(id: cart_item_params[:product_id])
      end

      def find_cart_item
        @cart_item = @cart.cart_items.find_by(id: params[:id])
        render json: { error: 'Cart item not found' }, status: :not_found unless @cart_item
      end

      def set_cart
        @cart = @current_user.cart || @current_user.create_cart
      end

      def cart_item_params
        params.require(:cart_item).permit(:id, :product_id, :product_customization_id)
      end
    end
  end
end
