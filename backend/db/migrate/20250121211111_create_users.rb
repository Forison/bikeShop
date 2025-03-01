# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.date :date_of_birth, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest
      t.string :token
      t.string :role, null: false, default: :customer

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
