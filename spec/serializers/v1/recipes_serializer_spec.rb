require "rails_helper"

describe V1::RecipesSerializer do
  let(:recipe) { create(:recipe) }
  let(:serializer) { described_class.new(recipe) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }

  it "includes the expected attributes" do
    serialized_hash = serialization.serializable_hash
    expect(serialized_hash[:id]).to eq(recipe.id)
    expect(serialized_hash[:title]).to eq(recipe.title)
    expect(serialized_hash[:image]).to eq(recipe.image)
  end
end
