module V1
  class RecipesSerializer < ActiveModel::Serializer
    attributes :id, :title, :image
  end
end
