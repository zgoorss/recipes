class Api::V1::RecipesController < ApplicationController
  after_action :set_pagy_headers, only: :index

  def index
    @pagy, records = pagy(Recipe.all.order(created_at: :desc), page: index_page)
    render json: records, each_serializer: ::V1::RecipesSerializer
  end

  def show
  end

  private

  def set_pagy_headers
    pagy_headers_merge(@pagy) if @pagy
  end

  def index_page
    params[:page] || 1
  end
end
