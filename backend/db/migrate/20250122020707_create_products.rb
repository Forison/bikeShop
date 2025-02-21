# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.references :category, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description, null: false
      t.decimal :base_price, precision: 10, scale: 2, null: false, default: 0.00
      t.integer :quantity, default: 0, null: false

      t.timestamps
    end
  end
end
