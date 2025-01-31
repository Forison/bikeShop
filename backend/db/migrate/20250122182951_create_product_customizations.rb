# frozen_string_literal: true

class CreateProductCustomizations < ActiveRecord::Migration[7.2]
  def change
    create_table :product_customizations do |t|
      t.references :product, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.decimal :total_price, precision: 10, scale: 2, null: false, default: 0.0
      t.jsonb :selected_options, null: false, default: []

      t.timestamps
    end
  end
end
