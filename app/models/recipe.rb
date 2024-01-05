class Recipe < ApplicationRecord
  include PgSearch::Model

  belongs_to :category

  validates :title, :cook_time, :prep_time, :ingredients, presence: true

  pg_search_scope :by_ingredients, against: :ingredients, using: {
    tsearch: {
      dictionary: "english",
      tsvector_column: "ingredients_search"
    }
  }
end
