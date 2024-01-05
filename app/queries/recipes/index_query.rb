module Recipes
  class IndexQuery
    def initialize(params)
      @title = params[:title]
      @category_ids = params[:category_ids]
      @ingredients = params[:ingredients]
    end

    def call
      Recipe
        .all
        .then { filter_by_title(_1) }
        .then { filter_by_category_ids(_1) }
        .then { filter_by_ingredients(_1) }
        .order(title: :asc)
    end

    private

    attr_reader :title, :category_ids, :ingredients

    def filter_by_title(scope)
      return scope if title.blank?

      scope.where("lower(title) ILIKE ?", "%#{title}%")
    end

    def filter_by_category_ids(scope)
      return scope if category_ids.blank?

      scope.where(category_id: category_ids.split(","))
    end

    def filter_by_ingredients(scope)
      return scope if ingredients.blank?

      # values = ingredients.split(",").map { _1.titleize.split }.join(" & ").downcase
      # scope.where("ingredients_search @@ to_tsquery('english', ?)", values)
      values = ingredients.gsub(/[^A-Za-z0-9,]/, "-").split(",").join(" ")
      scope.by_ingredients(values)
    end
  end
end
