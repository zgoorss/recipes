Rails.application.routes.draw do
  root "homepage#index"
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      get "categories/index"
      get "recipes/index"
      get "/recipe/:id", controller: :recipes, action: :show
    end
  end

  get "/*path" => "homepage#index"
end
