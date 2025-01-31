# frozen_string_literal: true

FactoryBot.define do
  factory :product_v1, class: 'Api::V1::Product' do
    association :user
    name { 'Fat Bike' }
    category { 'Bikes' }
    description { 'A high-quality fat bike perfect for all terrains.' }
    base_price { 1000.00 }
    quantity { 10 }
  end
end
