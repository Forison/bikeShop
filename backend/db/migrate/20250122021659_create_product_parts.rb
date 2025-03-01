# frozen_string_literal: true

class CreateProductParts < ActiveRecord::Migration[7.2]
  def change
    create_table :product_parts do |t|
      t.string :name, null: false
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
