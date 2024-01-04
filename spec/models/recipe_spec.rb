require "rails_helper"

describe Recipe, type: :model do
  it { should belong_to(:category) }
end
