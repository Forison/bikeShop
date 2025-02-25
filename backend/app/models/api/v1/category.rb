# frozen_string_literal: true

module Api
  module V1
    class Category < ApplicationRecord
      validates :name, uniqueness: { case_sensitive: false }
      has_many :products
      has_many :product_parts
      has_many :product_part_options, through: :product_parts
    end
  end
end
