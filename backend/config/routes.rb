# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: %i[index create show destroy]
      resources :product_customizations, only: %i[create show]
      resources :price_rules, only: %i[create update destroy]
      resources :carts, only: :index
      resources :cart_items, only: %i[create destroy]
      resources :categories, only: %i[create index]
      resources :product_parts, only: %i[create show]
      resources :orders, only: %i[index show create]

      post 'register', to: 'auth#register'
      post 'login', to: 'auth#login'
      get 'me', to: 'users#me'
    end
  end
end

