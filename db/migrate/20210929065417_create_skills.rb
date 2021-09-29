class CreateSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.references :master_skill, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.float :self_rating
      t.integer :exp_month
      t.integer :exp_year

      t.timestamps
    end
  end
end
