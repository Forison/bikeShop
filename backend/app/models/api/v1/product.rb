# frozen_string_literal: true

module Api
  module V1
    class Product < ApplicationRecord
      default_scope { order(created_at: :desc) }
      belongs_to :user
      has_many :product_parts, dependent: :destroy
      has_many :product_part_options, through: :product_parts
      has_one :combination_rule, dependent: :destroy
      has_one :price_rule, dependent: :destroy
      has_one :product_customization, dependent: :destroy

      validates :name, :category, presence: true
    end
  end
end
