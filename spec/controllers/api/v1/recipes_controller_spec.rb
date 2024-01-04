require "rails_helper"

describe Api::V1::RecipesController, type: :controller do
  describe "GET #index" do
    let!(:recipe1) { create(:recipe, title: "Recipe 1") }
    let!(:recipe2) { create(:recipe, title: "Recipe 2") }

    context "when title param is not present" do
      before { get :index }

      it "returns all recipes" do
        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json.size).to eq(2)
      end
    end

    context "when title param is present" do
      before { get :index, params: { title: "Recipe 1" } }

      it "returns recipes with matching title" do
        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json.size).to eq(1)
        expect(json[0]["title"]).to eq("Recipe 1")
      end
    end
  end

  describe "GET #show" do
    let(:recipe) { create(:recipe) }

    it "returns the recipe" do
      get :show, params: { id: recipe.id }
      json = JSON.parse(response.body)

      expect(json).not_to be_empty
      expect(json["id"]).to eq(recipe.id)
    end

    context "when record is not found" do
      it "returns 404" do
        get :show, params: { id: -1 }

        expect(response.status).to eq(404)
      end
    end
  end
end
