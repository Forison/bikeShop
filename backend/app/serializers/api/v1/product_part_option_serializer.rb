# frozen_string_literal: true

module Api
  module V1
    class ProductPartOptionSerializer < ActiveModel::Serializer
      attributes :name, :price, :quantity
    end
  end
end
