# frozen_string_literal: true

class CreateCarts < ActiveRecord::Migration[7.2]
  def change
    create_table :carts do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :total, precision: 10, scale: 2, null: false, default: 0.00
      t.timestamps
    end
  end
end
