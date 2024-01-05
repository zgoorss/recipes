class AddIngredientsSearchColumnToRecipes < ActiveRecord::Migration[7.1]
  def change
    add_column :recipes, :ingredients_search, :tsvector
    add_index :recipes, :ingredients_search, using: "gin"

    Recipe.update_all("ingredients_search = to_tsvector(array_to_string(ingredients, ','))")
  end
end
