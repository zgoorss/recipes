class Api::V1::CategoriesController < ApplicationController
  def index
    render json: fetch_categories, each_serializer: ::V1::CategoriesSerializer
  end

  private

  def permit_params
    params.permit(:title)
  end

  def fetch_categories
    Categories::IndexQuery.new(permit_params).call
  end
end
