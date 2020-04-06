# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create([
  {
    title: "Colors", 
    description: "Flash cards that will teach all colors of the rainbow."
  },
  {
    title: "Sight Words",
    description: "Flash cards that target sight words."
  }
])

Card.create([
  {
    title: "Red", 
    description: "A red ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Orange", 
    description: "A orange ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Yellow", 
    description: "A yellow ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Green", 
    description: "A green ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Blue", 
    description: "A blue ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Indigo", 
    description: "A indigo ball.", 
    image: "image url here", 
    category: Category.first
  },
  {
    title: "Violet", 
    description: "A violet ball.", 
    image: "image url here", 
    category: Category.first
  }
])
