# frozen_string_literal: true

module Api
  module V1
    class CombinationRuleSerializer < ActiveModel::Serializer
      attributes :prohibited_options
    end
  end
end
