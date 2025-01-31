# frozen_string_literal: true

module Api
  module V1
    class Cart < ApplicationRecord
      belongs_to :user
      has_many :cart_items, dependent: :destroy
    end
  end
end
