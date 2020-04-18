class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :cards, :id
  has_many :cards
end
