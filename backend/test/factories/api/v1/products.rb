# frozen_string_literal: true

FactoryBot.define do
  factory :product, class: 'Api::V1::Product' do
    name { 'MyString' }
    category { 'MyString' }
    base_price { '9.99' }
  end
end
