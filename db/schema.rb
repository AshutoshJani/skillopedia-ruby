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

ActiveRecord::Schema.define(version: 2021_09_29_123113) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "logins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_logins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_logins_on_reset_password_token", unique: true
  end

  create_table "master_projects", force: :cascade do |t|
    t.string "proj_name"
    t.text "proj_description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "master_roles", force: :cascade do |t|
    t.string "role_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "master_skills", force: :cascade do |t|
    t.string "skill_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "master_project_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["master_project_id"], name: "index_projects_on_master_project_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "master_role_id"
    t.boolean "admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["master_role_id"], name: "index_roles_on_master_role_id"
    t.index ["user_id"], name: "index_roles_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.bigint "master_skill_id"
    t.bigint "user_id"
    t.float "self_rating"
    t.integer "exp_month"
    t.integer "exp_year"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["master_skill_id"], name: "index_skills_on_master_skill_id"
    t.index ["user_id"], name: "index_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "exp_year"
    t.integer "exp_month"
    t.string "github"
    t.boolean "signup_request"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "login_id"
    t.index ["login_id"], name: "index_users_on_login_id"
  end

  add_foreign_key "projects", "master_projects"
  add_foreign_key "projects", "users"
  add_foreign_key "roles", "master_roles"
  add_foreign_key "roles", "users"
  add_foreign_key "skills", "master_skills"
  add_foreign_key "skills", "users"
  add_foreign_key "users", "logins"
end
