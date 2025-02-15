# frozen_string_literal: true

module Api
  module V1
    class ProductCustomizationSerializer < ActiveModel::Serializer
      attributes :id, :total_price, :selected_options
    end
  end
end
