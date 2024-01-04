require "rails_helper"

describe Recipes::IndexQuery do
  subject(:query) { described_class.new(params) }

  let(:params) { {} }

  describe "#call" do
    subject(:call) { query.call }

    let!(:recipe) { create(:recipe, title: "1 Pizza") }
    let!(:recipe_with_category) { create(:recipe, title: "2 Pasta", category: create(:category, title: "Italian")) }
    let!(:recipe_with_ingredients) { create(:recipe, title: "3 Salad", ingredients: ["cucumber"]) }

    it { is_expected.to eq([recipe, recipe_with_category, recipe_with_ingredients]) }

    context "when title is specified" do
      let(:params) { { title: "Pizza" } }

      it { is_expected.to eq([recipe]) }
    end

    context "when category_ids is specified" do
      let(:params) { { category_ids: [recipe_with_category.category_id] } }

      it { is_expected.to eq([recipe_with_category]) }
    end

    context "when ingredients is specified" do
      let(:params) { { ingredients: "cucumber" } }

      it { is_expected.to eq([recipe_with_ingredients]) }
    end
  end
end
