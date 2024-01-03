class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :cook_time, null: false
      t.integer :prep_time, null: false
      t.string :ingredients, array: true, default: []
      t.float :ratings, array: true, default: []
      t.string :cuisine
      t.references :category, null: false, foreign_key: true
      t.string :author
      t.string :image

      t.timestamps
    end
    add_index :recipes, :title
    add_index :recipes, :ingredients, using: "gin"
    add_index :recipes, :ratings, using: "gin"
  end
end
