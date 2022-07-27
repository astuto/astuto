Rails.application.routes.draw do
  if Rails.application.multi_tenancy?
    constraints subdomain: 'showcase' do
      root to: 'static_pages#showcase', as: :showcase
    end

    constraints subdomain: 'login' do
      get '/signup', to: 'tenants#new'
      get '/is_available', to: 'tenants#is_available'
      
      resource :tenants, only: [:create]
    end
  end

  constraints subdomain: /.*/ do
    root to: 'static_pages#roadmap'
    
    get '/roadmap', to: 'static_pages#roadmap'
    get '/pending-tenant', to: 'static_pages#pending_tenant'
    get '/blocked-tenant', to: 'static_pages#blocked_tenant'
    
    devise_for :users, :controllers => {
      :registrations => 'registrations',
      :sessions => 'sessions'
    }
    
    resources :tenants, only: [:show, :update]
    resources :users, only: [:index, :update]
    resources :o_auths, only: [:index, :create, :update, :destroy]
  
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
      get 'authentication'
    end
  end
end
