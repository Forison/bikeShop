# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: %i[index create show update destroy]
      resources :product_customizations, only: %i[create show]
      resources :product_parts, only: %i[create update destroy]
      resources :combination_rules, only: %i[create update destroy]
      resources :price_rules, only: %i[create update destroy]
      resources :product_part_options, only: %i[create update destroy]
      resources :carts, only: :index
      resources :cart_items, only: %i[create destroy]
      resources :orders, only: :create

      post 'register', to: 'auth#register'
      post 'login', to: 'auth#login'
      get 'me', to: 'users#me'
    end
  end
end

