class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.text :description
      t.string :image
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
