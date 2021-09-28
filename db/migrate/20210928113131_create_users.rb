class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :exp_year
      t.integer :exp_month
      t.string :github
      t.boolean :signup_request

      t.timestamps
    end
  end
end
