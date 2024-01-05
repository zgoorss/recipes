class Recipe < ApplicationRecord
  belongs_to :category

  validates :title, :cook_time, :prep_time, :ingredients, presence: true

  after_commit :update_ingredients_search

  private

  def update_ingredients_search
    self
      .class
      .where(ingredients_search: nil)
      .update_all("ingredients_search = to_tsvector(array_to_string(ingredients, ','))")
  end
end
