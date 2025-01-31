# frozen_string_literal: true

FactoryBot.define do
  factory :user, class: 'Api::V1::User' do
    email { Faker::Internet.unique.email }
    password { 'password123' }
    password_confirmation { 'password123' }
    name { Faker::Name.name }
    role { 'admin' }
  end
end
