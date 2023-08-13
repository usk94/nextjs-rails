Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace 'api' do
    namespace 'v1' do
      resources :books, only: [:index, :create, :show, :destroy] do
        collection do
          delete "delete_all"
        end
      end
      resources :users, only: [:create, :show, :destroy]
      resources :user_points, only: [:create, :show, :update]
    end
  end
end
