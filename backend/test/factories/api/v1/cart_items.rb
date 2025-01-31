# frozen_string_literal: true

FactoryBot.define do
  factory :cart_item do
    cart { nil }
    product { nil }
    product_customization { nil }
    quantity { 1 }
    total_price { '9.99' }
  end
end
