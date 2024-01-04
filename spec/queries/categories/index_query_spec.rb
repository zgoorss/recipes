require "rails_helper"

describe Categories::IndexQuery do
  describe "#call" do
    let!(:category1) { create(:category, title: "Category 1") }
    let!(:category2) { create(:category, title: "Category 2") }
    let!(:category3) { create(:category, title: "Category 3") }

    context "when title param is not present" do
      let(:params) { {} }
      let(:query) { described_class.new(params) }

      it "returns all categories" do
        result = query.call
        expect(result).to contain_exactly(category1, category2, category3)
      end
    end

    context "when title param is present" do
      let(:params) { { title: "Category 1" } }
      let(:query) { described_class.new(params) }

      it "returns categories with matching title" do
        result = query.call
        expect(result).to contain_exactly(category1)
      end
    end
  end
end
