# frozen_string_literal: true

FactoryBot.define do
  factory :product_part_option_configuration, class: 'Api::V1::ProductPartOptionConfiguration' do
    productPart { nil }
    productCustomization { nil }
  end
end
