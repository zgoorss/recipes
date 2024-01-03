class Category < ApplicationRecord
  has_many :recipes, dependent: :destroy

  normalizes :title, with: -> (title) { title.strip.parameterize.titlecase }
end
