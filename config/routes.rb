Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :create, :destroy]
  get '/youtube' => 'api#youtube'
  get '/youtube' => 'api#youtube'
  get '/youtube' => 'api#youtube'
  get '/youtube' => 'api#youtube'
end
