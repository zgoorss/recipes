require "rails_helper"

describe Recipe, type: :model do
  it { should belong_to(:category) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:cook_time) }
  it { should validate_presence_of(:prep_time) }
  it { should validate_presence_of(:ingredients) }
end
