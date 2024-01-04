class Category < ApplicationRecord
  has_many :recipes, dependent: :destroy

  validates :title, presence: true
  normalizes :title, with: -> (title) { title.strip.parameterize.titlecase }
end
