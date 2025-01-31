# frozen_string_literal: true

class CreatePriceRules < ActiveRecord::Migration[7.2]
  def change
    create_table :price_rules do |t|
      t.references :product, null: false, foreign_key: true
      t.string :condition_key, null: false
      t.string :condition_value, null: false
      t.decimal :price_modifier, precision: 10, scale: 2, null: false, default: 0.0

      t.timestamps
    end
  end
end
