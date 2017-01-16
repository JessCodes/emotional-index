Rails.application.routes.draw do

  resources :users
  get '/youtube' => 'api#youtube'
  get '/gemo' => 'api#gemo'
  get '/twilio' => 'api#twilio'
  get '/giphy' => 'api#giphy'

end
