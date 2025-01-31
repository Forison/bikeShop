# frozen_string_literal: true

FactoryBot.define do
  factory :product_part, class: 'Api::V1::ProductPart' do
    name { 'MyString' }
    base_price { '9.99' }
    product { nil }
  end
end
