# frozen_string_literal: true

FactoryBot.define do
  factory :combination_rule, class: 'Api::V1::CombinationRule' do
    association :product

    prohibited_options do
      [
        { 'Rim' => 'fat bike wheels' },
        { 'Frame type' => 'Full-suspension' }
      ]
    end
  end
end
