class AddRelationshipToCard < ActiveRecord::Migration[6.0]
  def change
    add_reference :cards, :category, null: false, foreign_key: true
  end
end
