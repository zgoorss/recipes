require "rails_helper"

describe V1::CategoriesSerializer do
  let(:category) { create(:category) }
  let(:serializer) { described_class.new(category) }
  let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }

  it "includes the expected attributes" do
    serialized_hash = serialization.serializable_hash
    expect(serialized_hash[:id]).to eq(category.id)
    expect(serialized_hash[:title]).to eq(category.title)
  end
end
