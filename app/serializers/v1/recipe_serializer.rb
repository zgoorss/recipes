module V1
  class RecipeSerializer < ActiveModel::Serializer
    attributes \
      :id,
      :title,
      :cook_time,
      :prep_time,
      :ingredients,
      :cuisine,
      :author,
      :image,
      :category_name,
      :rating,

    def category_name
      object.category.title
    end

    def rating
      (
        object.ratings.sum.to_f / object.ratings.count
      ).round(2)
    end
  end
end
