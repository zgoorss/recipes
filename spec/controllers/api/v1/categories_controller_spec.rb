require "rails_helper"

describe Api::V1::CategoriesController, type: :controller do
  describe "GET #index" do
    let!(:category1) { create(:category, title: "Category 1") }
    let!(:category2) { create(:category, title: "Category 2") }

    context "when title param is not present" do
      before { get :index }

      it "returns all categories" do
        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json.size).to eq(2)
      end
    end

    context "when value param is present" do
      before { get :index, params: { value: "Category 1" } }

      it "returns categories with matching title" do
        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json.size).to eq(1)
        expect(json[0]["title"]).to eq("Category 1")
      end
    end
  end
end
