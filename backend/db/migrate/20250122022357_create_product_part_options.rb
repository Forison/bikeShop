# frozen_string_literal: true

class CreateProductPartOptions < ActiveRecord::Migration[7.2]
  def change
    create_table :product_part_options do |t|
      t.references :product_part, null: false, foreign_key: true
      t.string :name, null: false
      t.decimal :price, precision: 10, scale: 2, null: false, default: 0.0

      t.timestamps
    end
  end
end
