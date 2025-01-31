# frozen_string_literal: true

module Api
  module V1
    class PriceRuleSerializer < ActiveModel::Serializer
      attributes :id, :condition_key, :condition_value, :price_modifier
    end
  end
end
