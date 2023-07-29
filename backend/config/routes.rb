Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace 'api' do
    namespace 'v1' do
      resources :books, only: [:index, :create, :show, :destroy] do
        collection do
          delete "delete_all"
        end
      end
    end
  end
end
