class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.references :user, index: true, foreign_key: true
      t.references :master_role, index: true, foreign_key: true
      t.boolean :admin

      t.timestamps
    end
  end
end
