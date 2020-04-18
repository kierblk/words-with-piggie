class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :image, :category_id, :id
  belongs_to :category

  attribute :category_name do |object|
    category_name = Category.find(object.category_id).title
  end
end
