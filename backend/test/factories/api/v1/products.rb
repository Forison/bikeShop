# frozen_string_literal: true

FactoryBot.define do
  factory :product, class: 'Api::V1::Product' do
    association :user

    name { 'Fat Bike' }
    category { 'Bikes' }
    description { 'A high-quality fat bike perfect for all terrains.' }
    base_price { 1000.00 }
    quantity { 10 }

    trait :with_combination_rule do
      association :combination_rule, factory: :combination_rule
    end
  end
end
