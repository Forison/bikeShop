# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_02_25_193341) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cart_items", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "product_id", null: false
    t.bigint "product_customization_id"
    t.integer "quantity", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index %w[cart_id product_id], name: "index_cart_items_on_cart_id_and_product_id"
    t.index ["cart_id"], name: "index_cart_items_on_cart_id"
    t.index ["product_customization_id"], name: "index_cart_items_on_product_customization_id"
    t.index ["product_id"], name: "index_cart_items_on_product_id"
  end

  create_table "carts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "total", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "combination_rules", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.jsonb "prohibited_options", default: [], null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_combination_rules_on_product_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.bigint "product_customization_id", null: false
    t.integer "quantity"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_customization_id"], name: "index_order_items_on_product_customization_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "total"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "price_rules", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.string "condition_key", null: false
    t.string "condition_value", null: false
    t.decimal "price_modifier", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_price_rules_on_product_id"
  end

  create_table "product_customizations", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "user_id", null: false
    t.decimal "total_price", precision: 10, scale: 2, default: "0.0", null: false
    t.jsonb "selected_options", default: [], null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_customizations_on_product_id"
    t.index ["user_id"], name: "index_product_customizations_on_user_id"
  end

  create_table "product_part_options", force: :cascade do |t|
    t.bigint "product_part_id", null: false
    t.string "name", null: false
    t.decimal "price", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_part_id"], name: "index_product_part_options_on_product_part_id"
  end

  create_table "product_parts", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_product_parts_on_category_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.boolean "not_customizable", default: true, null: false
    t.decimal "base_price", precision: 10, scale: 2, default: "0.0", null: false
    t.integer "quantity", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "last_name", null: false
    t.string "first_name", null: false
    t.date "date_of_birth", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.string "token"
    t.string "role", default: "customer", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "cart_items", "carts"
  add_foreign_key "cart_items", "product_customizations"
  add_foreign_key "cart_items", "products"
  add_foreign_key "carts", "users"
  add_foreign_key "combination_rules", "products"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "product_customizations"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "users"
  add_foreign_key "price_rules", "products"
  add_foreign_key "product_customizations", "products"
  add_foreign_key "product_customizations", "users"
  add_foreign_key "product_part_options", "product_parts"
  add_foreign_key "product_parts", "categories"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "users"
end
