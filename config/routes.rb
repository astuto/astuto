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
    resources :comments, only: [:index, :create, :update]
  end
  
  resources :boards, only: [:index, :create, :update, :destroy, :show] do
    patch 'update_order', on: :collection
  end

  resources :post_statuses, only: [:index, :create, :update, :destroy] do
    patch 'update_order', on: :collection
  end

  namespace :site_settings do
    get 'general'
    get 'boards'
    get 'post_statuses'
  end
end
