# frozen_string_literal: true

class CreateCombinationRules < ActiveRecord::Migration[7.2]
  def change
    create_table :combination_rules do |t|
      t.references :product, null: false, foreign_key: true
      t.jsonb :prohibited_options, null: false, default: []

      t.timestamps
    end
  end
end
