# frozen_string_literal: true

FactoryBot.define do
  factory :cart_item_v1, class: 'Api::V1::CartItem' do
    association :cart
    association :product
    quantity { 1 }
  end
end
