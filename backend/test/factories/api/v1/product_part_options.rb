# frozen_string_literal: true

FactoryBot.define do
  factory :product_part_option, class: 'Api::V1::ProductPartOption' do
    association :product_part
    name { 'Fat bike wheel option' }
    quantity { 1 }
    price { 100.00 }
  end
end
