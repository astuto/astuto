# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_02_07_201354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "order", null: false
    t.bigint "tenant_id", null: false
    t.index ["name", "tenant_id"], name: "index_boards_on_name_and_tenant_id", unique: true
    t.index ["tenant_id"], name: "index_boards_on_tenant_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_post_update", default: false, null: false
    t.bigint "tenant_id", null: false
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["tenant_id"], name: "index_comments_on_tenant_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tenant_id", null: false
    t.index ["post_id"], name: "index_follows_on_post_id"
    t.index ["tenant_id"], name: "index_follows_on_tenant_id"
    t.index ["user_id", "post_id"], name: "index_follows_on_user_id_and_post_id", unique: true
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tenant_id", null: false
    t.index ["post_id"], name: "index_likes_on_post_id"
    t.index ["tenant_id"], name: "index_likes_on_tenant_id"
    t.index ["user_id", "post_id"], name: "index_likes_on_user_id_and_post_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "o_auths", force: :cascade do |t|
    t.string "name", null: false
    t.string "logo"
    t.boolean "is_enabled", default: false, null: false
    t.string "client_id", null: false
    t.string "client_secret", null: false
    t.string "authorize_url", null: false
    t.string "token_url", null: false
    t.string "profile_url", null: false
    t.string "scope", null: false
    t.string "json_user_name_path"
    t.string "json_user_email_path", null: false
    t.bigint "tenant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "tenant_id"], name: "index_o_auths_on_name_and_tenant_id", unique: true
    t.index ["tenant_id"], name: "index_o_auths_on_tenant_id"
  end

  create_table "post_status_changes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.bigint "post_status_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tenant_id", null: false
    t.index ["post_id"], name: "index_post_status_changes_on_post_id"
    t.index ["post_status_id"], name: "index_post_status_changes_on_post_status_id"
    t.index ["tenant_id"], name: "index_post_status_changes_on_tenant_id"
    t.index ["user_id"], name: "index_post_status_changes_on_user_id"
  end

  create_table "post_statuses", force: :cascade do |t|
    t.string "name", null: false
    t.string "color", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "order", null: false
    t.boolean "show_in_roadmap", default: false, null: false
    t.bigint "tenant_id", null: false
    t.index ["name", "tenant_id"], name: "index_post_statuses_on_name_and_tenant_id", unique: true
    t.index ["tenant_id"], name: "index_post_statuses_on_tenant_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.bigint "board_id", null: false
    t.bigint "user_id", null: false
    t.bigint "post_status_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tenant_id", null: false
    t.index ["board_id"], name: "index_posts_on_board_id"
    t.index ["post_status_id"], name: "index_posts_on_post_status_id"
    t.index ["tenant_id"], name: "index_posts_on_tenant_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "tenant_settings", force: :cascade do |t|
    t.integer "brand_display", default: 0, null: false
    t.bigint "tenant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "show_vote_count", default: false, null: false
    t.boolean "show_vote_button_in_board", default: false, null: false
    t.integer "root_board_id", default: 0, null: false
    t.boolean "show_roadmap_in_header", default: true, null: false
    t.index ["tenant_id"], name: "index_tenant_settings_on_tenant_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "site_name", null: false
    t.string "site_logo"
    t.string "subdomain", null: false
    t.string "locale", default: "en"
    t.string "custom_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "status"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role"
    t.string "full_name"
    t.boolean "notifications_enabled", default: true, null: false
    t.integer "status"
    t.bigint "tenant_id", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email", "tenant_id"], name: "index_users_on_email_and_tenant_id", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["tenant_id"], name: "index_users_on_tenant_id"
  end

  add_foreign_key "boards", "tenants"
  add_foreign_key "comments", "comments", column: "parent_id"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "tenants"
  add_foreign_key "comments", "users"
  add_foreign_key "follows", "posts"
  add_foreign_key "follows", "tenants"
  add_foreign_key "follows", "users"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "tenants"
  add_foreign_key "likes", "users"
  add_foreign_key "o_auths", "tenants"
  add_foreign_key "post_status_changes", "post_statuses"
  add_foreign_key "post_status_changes", "posts"
  add_foreign_key "post_status_changes", "tenants"
  add_foreign_key "post_status_changes", "users"
  add_foreign_key "post_statuses", "tenants"
  add_foreign_key "posts", "boards"
  add_foreign_key "posts", "post_statuses"
  add_foreign_key "posts", "tenants"
  add_foreign_key "posts", "users"
  add_foreign_key "tenant_settings", "tenants"
  add_foreign_key "users", "tenants"
end
