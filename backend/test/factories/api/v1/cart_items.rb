# frozen_string_literal: true

FactoryBot.define do
  factory :cart_item, class: 'Api::V1::CartItem' do
    association :cart
    association :product
    association :product_customization
    quantity { 1 }
  end
end
