Rails.application.routes.draw do
  mount Rswag::Api::Engine => '/api-docs'

  if Rails.application.multi_tenancy?
    constraints subdomain: 'showcase' do
      root to: 'static_pages#showcase', as: :showcase
    end

    constraints subdomain: 'api' do
      mount Rswag::Api::Engine => '/api-docs'
    end

    constraints subdomain: 'login' do
      get '/signup', to: 'tenants#new'
      get '/is_available', to: 'tenants#is_available'
      
      resource :tenants, only: [:create]
    end

    constraints subdomain: 'billing' do
      get '/billing', to: 'billing#index'
      get '/billing/return', to: 'billing#return'
      post '/create_checkout_session', to: 'billing#create_checkout_session'
      get '/session_status', to: 'billing#session_status'
      post '/webhook', to: 'billing#webhook'
    end
  end

  constraints subdomain: /.*/ do
    root to: 'static_pages#root'
    
    get '/roadmap', to: 'static_pages#roadmap'
    get '/embedded_roadmap', to: 'static_pages#embedded_roadmap'
    get '/pending-tenant', to: 'static_pages#pending_tenant'
    get '/blocked-tenant', to: 'static_pages#blocked_tenant'
    
    get '/request_billing_page', to: 'billing#request_billing_page'
    
    devise_for :users, :controllers => {
      :registrations => 'registrations',
      :sessions => 'sessions',
      :passwords => 'passwords'
    }

    devise_scope :user do
      get '/users/send_set_password_instructions', to: 'registrations#send_set_password_instructions', as: :send_set_password_instructions
    end
    
    resources :tenants, only: [:show, :update]
    resources :users, only: [:index, :update]
    resources :o_auths, only: [:index, :create, :update, :destroy] do
      resource :tenant_default_o_auths, only: [:create, :destroy]
    end
    get '/o_auths/:id/start', to: 'o_auths#start', as: :o_auth_start
    get '/o_auths/:id/callback', to: 'o_auths#callback', as: :o_auth_callback
    get '/o_auths/sign_in_from_oauth_token', to: 'o_auths#sign_in_from_oauth_token', as: :o_auth_sign_in_from_oauth_token
  
    resources :posts, only: [:index, :create, :show, :update, :destroy] do
      resource :follows, only: [:create, :destroy]
      resources :follows, only: [:index]
      resource :likes, only: [:create, :destroy]
      resources :likes, only: [:index]
      resources :comments, only: [:index, :create, :update, :destroy]
      resources :post_status_changes, only: [:index]

      get '/moderation', on: :collection, to: 'posts#moderation'
    end
    
    resources :boards, only: [:index, :create, :update, :destroy, :show] do
      patch 'update_order', on: :collection
    end
  
    resources :post_statuses, only: [:index, :create, :update, :destroy] do
      patch 'update_order', on: :collection
    end

    resources :invitations, only: [:create]
    post '/invitations/test', to: 'invitations#test', as: :invitation_test

    resources :api_keys, only: [:create]
  
    namespace :site_settings do
      get 'general'
      get 'authentication'
      get 'boards'
      get 'post_statuses'
      get 'roadmap'
      get 'invitations'
      get 'appearance'
    end

    namespace :moderation do
      get 'feedback'
      get 'users'
    end

    namespace :api do
      namespace :v1 do
        resources :boards, only: [:index, :show, :create]
        resources :post_statuses, only: [:index]
        resources :posts, only: [:index, :show, :create, :update, :destroy] do
          member do
            put :update_board, :update_status, :approve, :reject
          end
        end
        resources :comments, only: [:index, :show, :create]

        resource :api_key, only: [:show]
      end
    end
  end

  # Healthcheck endpoint
  get '/health', to: proc {
    Tenant.first # to make sure db works
    [200, {}, ['success']]
  }
end
