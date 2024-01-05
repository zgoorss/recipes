class AddIngredientsSearchColumnToRecipes < ActiveRecord::Migration[7.1]
  def up
    add_column :recipes, :ingredients_search, :tsvector
    add_index :recipes, :ingredients_search, using: "gin"

    execute <<-SQL.squish
      CREATE OR REPLACE FUNCTION update_recipes_tsv() RETURNS trigger AS $$
      begin
        new.ingredients_search :=
          to_tsvector(array_to_string(new.ingredients, ','));
      return new;
      end
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON "recipes" FOR EACH ROW EXECUTE PROCEDURE update_recipes_tsv();
    SQL

    Recipe.update_all("ingredients_search = to_tsvector(array_to_string(ingredients, ','))")
  end

  def down
    execute <<-SQL.squish
      DROP TRIGGER tsvectorupdate
      ON recipes
    SQL

    remove_index :recipes, :ingredients_search
    remove_column :recipes, :ingredients_search
  end
end
