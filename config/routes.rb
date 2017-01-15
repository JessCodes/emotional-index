Rails.application.routes.draw do
  
  devise_for :users

  resources :users, only: [:show, :create, :destroy]

  get '/youtube' => 'api#youtube'
  get '/gemo' => 'api#gemo'
  get '/twilio' => 'api#twilio'
  get '/giphy' => 'api#giphy'

end