# WELCOME IN RECIPES APP

## Requiremets

- Ruby 3.2.2
- Node 20

## Setup

- bundle
- rake db:setup
- bin/dev

## Models

### Categories

- `title`: string

There is an unique index on `title`

### Recipes

- `title`: string
- `cook_time`: integer
- `prep_time`: integer
- `ingredients`: array string
- `ratings`: array string
- `cuisine`: string
- `category_id` - belongs to categories
- `author`: string
- `image`: string

There is an index on category_id, ingredients, ratings and title.
