# frozen_string_literal: true

FactoryBot.define do
  factory :product_customization, class: 'Api::V1::ProductCustomization' do
    association :product
    association :user

    selected_options do
      [
        { 'part' => 'Wheels', 'option' => 'fat bike wheels', 'price' => 211.0 }
      ]
    end

    total_price { 211.0 }
  end
end
