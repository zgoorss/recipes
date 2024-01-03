class Api::V1::RecipesController < ApplicationController
  after_action :set_pagy_headers, only: :index

  def index
    @pagy, records = pagy(scope, page: index_params[:page] || 1)
    render json: records, each_serializer: ::V1::RecipesSerializer
  end

  def show
    record = Recipe.find(params[:id])
    render json: record, serializer: ::V1::RecipeSerializer
  end

  private

  def set_pagy_headers
    pagy_headers_merge(@pagy) if @pagy
  end

  def index_params
    params.permit(:page, :title, :category_ids, :ingredients)
  end

  def scope
    Recipes::IndexQuery.new(index_params).call
  end
end
