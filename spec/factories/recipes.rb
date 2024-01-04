FactoryBot.define do
  factory :recipe do
    title { "recipe title" }
    cook_time { 15 }
    prep_time { 5 }
    ingredients { ["tomato", "cheesee"] }
    ratings { [4, 5] }
    cuisine { "Italian" }
    category
    author { "John Doe" }
    image { "https://www.example.com/image.jpg" }
  end
end
