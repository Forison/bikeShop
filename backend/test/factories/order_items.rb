# frozen_string_literal: true

FactoryBot.define do
  factory :order_item do
    order { nil }
    product { nil }
    product_customization { nil }
    quantity { 1 }
    price { '9.99' }
  end
end
