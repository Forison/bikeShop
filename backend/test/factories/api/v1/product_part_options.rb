# frozen_string_literal: true

FactoryBot.define do
  factory :product_part_option, class: 'Api::V1::ProductPartOption' do
    name { 'MyString' }
    product_part { nil }
    base_price { 'MyString' }
    stock_status { false }
  end
end
