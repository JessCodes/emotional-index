Rails.application.routes.draw do
  root to: 'sessions#new'

  resources :users
  get '/login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/youtube' => 'api#youtube'
  get '/gemo' => 'api#gemo'
  get '/twilio' => 'api#twilio'
  get '/giphy' => 'api#giphy'

end
