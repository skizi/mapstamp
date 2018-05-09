Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	root to: 'home#index'
	post 'home/post_sns'


	get 'privacypolicy' => 'home#privacypolicy'
	get 'rule' => 'home#rule'
	get 'help' => 'home#help'

	get 'login' => 'sessions#new'
	# 'sessions#new'
	post 'login' => 'sessions#create'
	delete 'logout' => 'sessions#destroy'
	get 'logout' => 'sessions#destroy'
	get '/auth/:provider/callback' => 'sessions#createSns'
	get '/auth/failure' => redirect('/')


	get 'signup' => 'users#new'
	get 'signup/:provider' => 'users#new'
	get 'users/new/:provider' => 'users#new'
	get 'users/create_on_sns/:provider' => 'users#create_on_sns'
	get 'users/new' => 'users#new'
	get 'users/token/:uuid' => 'users#token'
	get 'users/tmp'
	get 'users/all'
	get 'users/:id' => 'users#show'
	post 'users/upload_process'


	get 'post_images/all'
	post 'post_images/create'
	get 'post_images/:id' => 'post_images#show'


	resources :users
	resources :post_images


	get 'users/index'

end
