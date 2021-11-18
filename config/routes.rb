Rails.application.routes.draw do
  devise_for :logins do
    delete '/logins/sign_out' => 'devise/sessions#destroy'
  end

  namespace :api do
    namespace :v1 do
      resources :users
      resources :master_skills
      resources :master_projects
      resources :master_role
      resources :skills
      resources :role
      get '/current_user', to: 'current_user#index'
      put '/current_user/:id', to: 'current_user#update'
      delete '/logout', to: 'current_user#logout'
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "dashboard#index"
  get '/*path', to: 'dashboard#index'
end
