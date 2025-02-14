# frozen_string_literal: true

class CreateCartItems < ActiveRecord::Migration[7.2]
  def change
    create_table :cart_items do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.references :product_customization, foreign_key: true, null: true
      t.integer :quantity, null: false, default: 0
      t.timestamps
    end
    add_index :cart_items, %i[cart_id product_id]
  end
end
