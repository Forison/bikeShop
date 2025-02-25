# frozen_string_literal: true

module Api
  module V1
    class Product < ApplicationRecord
      default_scope { order(created_at: :desc) }
      belongs_to :user
      belongs_to :category

      has_one :combination_rule, dependent: :destroy
      has_many :price_rules, dependent: :destroy
      has_one :product_customization, dependent: :destroy

      validates :name, :description, :quantity, :category_id, presence: true
      validates :base_price, presence: true, if: -> { !not_customizable? }
    end
  end
end
