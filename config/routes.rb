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
  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :posts, only: [:index, :create, :show, :update] do
    resource :likes, only: [:create, :destroy]
    resources :likes, only: [:index]
    resources :comments, only: [:index, :create, :update]
  end
  resources :boards, only: [:show]
  resources :post_statuses, only: [:index]
end
