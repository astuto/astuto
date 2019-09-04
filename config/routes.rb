Rails.application.routes.draw do
  root to: 'static_pages#roadmap'
  get '/roadmap', to: 'static_pages#roadmap'

  namespace :admin do
    root to: 'boards#index'

    resources :boards
    resources :post_statuses
    resources :users
  end
  
  devise_for :users

  resources :boards, only: [:show]
  resources :posts, only: [:index, :create]
  resources :post_statuses, only: [:index]
end
