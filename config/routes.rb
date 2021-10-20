Rails.application.routes.draw do
  devise_for :logins

  namespace :api do
    namespace :v1 do
      resources :users
      resources :master_skills
      resources :master_projects
      resources :master_role
      get '/current_user', to: 'current_user#index'
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "dashboard#index"
  get '/*path', to: 'dashboard#index'
end
