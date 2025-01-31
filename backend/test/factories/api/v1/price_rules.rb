# frozen_string_literal: true

FactoryBot.define do
  factory :price_rule, class: 'Api::V1::PriceRule' do
    association :product
    condition_key { 'color' }
    condition_value { 'blue' }
    price_modifier { 20.00 }
  end
end
