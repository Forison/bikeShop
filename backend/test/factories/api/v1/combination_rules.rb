# frozen_string_literal: true

FactoryBot.define do
  factory :combination_rule do
    condition { '' }
    prohibited_options { '' }
    product_type { 'MyString' }
  end
end
