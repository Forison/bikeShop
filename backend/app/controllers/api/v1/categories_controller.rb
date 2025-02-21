# frozen_string_literal: true

module Api
  module V1
    class CategoriesController < ApplicationController
      before_action :authenticate_request

      def index
        categories = Api::V1::Category.all
        render json: categories, status: :ok
      end

      def create
        category = Api::V1::Category.new(name: category_params[:name])
        authorize category
        service = Api::V1::CreateCategoryService.new(category_params[:product_parts], category)
        if service.call
          render json: category, status: :created
        else
          render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def category_params
        params.require(:category).permit(
          :name,
          product_parts: [:name, { part_options: %i[name price quantity] }]
        )
      end
    end
  end
end
