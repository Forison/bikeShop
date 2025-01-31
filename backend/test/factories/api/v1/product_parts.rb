# frozen_string_literal: true

FactoryBot.define do
  factory :product_part, class: 'Api::V1::ProductPart' do
    association :product
    name { 'Wheel' }
  end
end
