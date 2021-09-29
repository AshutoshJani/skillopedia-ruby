class CreateMasterSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :master_skills do |t|
      t.string :skill_name

      t.timestamps
    end
  end
end
