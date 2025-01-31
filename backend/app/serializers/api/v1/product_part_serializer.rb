# frozen_string_literal: true

module Api
  module V1
    class ProductPartSerializer < ActiveModel::Serializer
      attributes :name
    end
  end
end
