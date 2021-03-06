Rails.application.routes.draw do
  root 'welcome#index'

  resources :users do
    resources :favorites, only: [:new, :create, :destroy]
  end

  get '/login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/youtube' => 'api#youtube'
  get '/gemo' => 'api#gemo'
  get '/twilio' => 'api#twilio'
  get '/giphy' => 'api#giphy'
  get '/login_swift' => 'sessions#login_swift'

end
