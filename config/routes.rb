Rails.application.routes.draw do
  constraints subdomain: /.*/ do
    root to: 'static_pages#roadmap'
    get '/roadmap', to: 'static_pages#roadmap'
    
    devise_for :users, :controllers => { :registrations => 'registrations' }
    resources :users, only: [:index, :update]
  
    resources :posts, only: [:index, :create, :show, :update, :destroy] do
      resource :follows, only: [:create, :destroy]
      resources :follows, only: [:index]
      resource :likes, only: [:create, :destroy]
      resources :likes, only: [:index]
      resources :comments, only: [:index, :create, :update, :destroy]
      resources :post_status_changes, only: [:index]
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
      get 'roadmap'
      get 'users'
    end
  end
end
