Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :admin do
    root to: "boards#index"

    resources :boards
    resources :users
  end
  
  devise_for :users

  resources :boards, only: [:show]
end
