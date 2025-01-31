# frozen_string_literal: true

FactoryBot.define do
  factory :product_customization_v1, class: 'Api::V1::ProductCustomization' do
    association :product
    association :user

    selected_options do
      [
        { 'part' => 'Wheels', 'option' => 'fat bike wheels', 'price' => 211.0 }
      ]
    end

    total_price { 211.0 }

    trait :with_multiple_options do
      selected_options do
        [
          { 'part' => 'Wheels', 'option' => 'fat bike wheels', 'price' => 211.0 },
          { 'part' => 'Frame type', 'option' => 'Full-suspension', 'price' => 610.0 }
        ]
      end
      total_price { 821.0 }
    end
  end
end
