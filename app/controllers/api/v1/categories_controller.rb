class Api::V1::CategoriesController < ApplicationController
  def index
    title = index_params[:title]
    records = title ? Category.where("title ILIKE ?", "%#{title}%").order(:title) : Category.all.order(:title)
    render json: records, each_serializer: ::V1::CategoriesSerializer
  end

  private

  def index_params
    params.permit(:title)
  end
end
