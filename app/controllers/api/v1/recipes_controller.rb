class Api::V1::RecipesController < ApplicationController
  after_action :set_pagy_headers, only: :index

  def index
    @pagy, records = pagy(fetch_recipes, page: permit_params[:page] || 1)
    render json: records, each_serializer: ::V1::RecipesSerializer
  end

  def show
    record = Recipe.find(permit_params[:id])
    render json: record, serializer: ::V1::RecipeSerializer
  end

  private

  def set_pagy_headers
    pagy_headers_merge(@pagy) if @pagy
  end

  def permit_params
    params.permit(:id, :page, :title, :category_ids, :ingredients)
  end

  def fetch_recipes
    Recipes::IndexQuery.new(permit_params).call
  end
end
