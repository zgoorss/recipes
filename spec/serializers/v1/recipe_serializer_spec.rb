require "rails_helper"

describe V1::RecipeSerializer do
  let(:recipe) { create(:recipe) }
  let(:serializer) { described_class.new(recipe) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }

  it "includes the expected attributes" do
    serialized_hash = serialization.serializable_hash
    expect(serialized_hash[:id]).to eq(recipe.id)
    expect(serialized_hash[:title]).to eq(recipe.title)
    expect(serialized_hash[:cook_time]).to eq(recipe.cook_time)
    expect(serialized_hash[:prep_time]).to eq(recipe.prep_time)
    expect(serialized_hash[:ingredients]).to eq(recipe.ingredients)
    expect(serialized_hash[:cuisine]).to eq(recipe.cuisine)
    expect(serialized_hash[:author]).to eq(recipe.author)
    expect(serialized_hash[:image]).to eq(recipe.image)
    expect(serialized_hash[:category_name]).to eq(recipe.category.title)
    expect(serialized_hash[:rating]).to eq((recipe.ratings.sum.to_f / recipe.ratings.count).round(2))
  end
end
