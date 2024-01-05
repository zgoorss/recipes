class Recipe < ApplicationRecord
  include PgSearch::Model

  belongs_to :category

  validates :title, :cook_time, :prep_time, :ingredients, presence: true

  after_commit :update_ingredients_search

  pg_search_scope :by_ingredients, against: :ingredients, using: {
    tsearch: {
      dictionary: "english",
      tsvector_column: "ingredients_search"
    }
  }

  private

  def update_ingredients_search
    self
      .class
      .where(ingredients_search: nil)
      .update_all("ingredients_search = to_tsvector(array_to_string(ingredients, ','))")
  end
end
