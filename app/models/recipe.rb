class Recipe < ApplicationRecord
  belongs_to :category

  validates :title, :cook_time, :prep_time, :ingredients, presence: true
end
