require "rails_helper"

describe Category, type: :model do
  subject { Category.new }

  it { should have_many(:recipes).dependent(:destroy) }

  describe "#title" do
    it "normalizes the title" do
      subject.title = "   test title   "
      subject.save
      expect(subject.title).to eq("Test Title")
    end
  end
end
