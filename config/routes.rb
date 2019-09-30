Rails.application.routes.draw do
  root to: 'static_pages#roadmap'
  get '/roadmap', to: 'static_pages#roadmap'

  namespace :admin do
    root to: 'boards#index'

    resources :boards
    resources :comments
    resources :posts
    resources :post_statuses
    resources :users
  end
  
  devise_for :users

  resources :posts, only: [:index, :create, :show, :update] do
    resource :likes, only: [:create, :destroy]
    resources :likes, only: [:index]
    resources :comments, only: [:index, :create]
  end
  resources :boards, only: [:show]
  resources :post_statuses, only: [:index]
end
