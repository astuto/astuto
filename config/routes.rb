Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :admin do
    root to: "users#index"
    resources :users
  end
  
  devise_for :users
end
