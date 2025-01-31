# frozen_string_literal: true

module Api
  module V1
    class PriceRule < ApplicationRecord
      belongs_to :product
    end
  end
end
