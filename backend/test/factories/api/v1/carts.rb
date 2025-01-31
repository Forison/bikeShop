# frozen_string_literal: true

FactoryBot.define do
  factory :cart, class: 'Api::V1::Cart' do
    association :user
    total { 0.00 }
  end
end
