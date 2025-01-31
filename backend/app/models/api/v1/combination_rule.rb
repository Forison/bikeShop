# frozen_string_literal: true

module Api
  module V1
    class CombinationRule < ApplicationRecord
      belongs_to :product
      validates :prohibited_options, presence: true
    end
  end
end
