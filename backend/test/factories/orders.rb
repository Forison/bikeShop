# frozen_string_literal: true

FactoryBot.define do
  factory :order do
    user { nil }
    total { '9.99' }
    status { 'MyString' }
  end
end
