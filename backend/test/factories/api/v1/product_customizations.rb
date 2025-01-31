# frozen_string_literal: true

FactoryBot.define do
  factory :product_configuration, class: 'Api::V1::ProductCustomization' do
    product { nil }
    total_price { 'MyString' }
  end
end
