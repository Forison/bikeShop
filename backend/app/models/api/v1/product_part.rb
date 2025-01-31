# frozen_string_literal: true

module Api
  module V1
    class ProductPart < ApplicationRecord
      belongs_to :product
      has_many :product_part_options, dependent: :destroy

      validates :name, presence: true
    end
  end
end
