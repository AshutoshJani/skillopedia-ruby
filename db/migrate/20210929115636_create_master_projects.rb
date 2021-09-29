class CreateMasterProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :master_projects do |t|
      t.string :proj_name
      t.text :proj_description

      t.timestamps
    end
  end
end
