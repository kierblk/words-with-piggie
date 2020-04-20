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
    image: "https://i.ibb.co/qCBKxc9/apples-634572-640.jpg", 
    category: Category.first
  },
  {
    title: "Orange", 
    description: "A orange ball.", 
    image: "https://i.ibb.co/2dfMksw/tangerines-1721590-640.jpg", 
    category: Category.first
  },
  {
    title: "Yellow", 
    description: "A yellow ball.", 
    image: "https://i.ibb.co/wM6KcxX/rananculus-4989694-640.jpg", 
    category: Category.first
  },
  {
    title: "Green", 
    description: "A green ball.", 
    image: "https://i.ibb.co/0JsXf1Z/green-leaf-176722-640.jpg", 
    category: Category.first
  },
  {
    title: "Blue", 
    description: "A blue ball.", 
    image: "https://i.ibb.co/4WPm1XW/butterfly-142506-640.jpg", 
    category: Category.first
  },
  {
    title: "Indigo", 
    description: "A indigo ball.", 
    image: "https://i.ibb.co/fkGXRjN/indigo-3590762-640.jpg", 
    category: Category.first
  },
  {
    title: "Violet", 
    description: "A violet ball.", 
    image: "https://i.ibb.co/n1rDpV6/cranesbill-374343-640.jpg", 
    category: Category.first
  }
])
