# frozen_string_literal: true

FactoryBot.define do
  factory :cart_v1, class: 'Api::V1::Cart' do
    association :user
    total { 0.00 }
  end
end
