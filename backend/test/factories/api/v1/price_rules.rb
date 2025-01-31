# frozen_string_literal: true

FactoryBot.define do
  factory :price_rule, class: 'Api::V1::PriceRule' do
    adjustment { '9.99' }
    condition { '' }
  end
end
