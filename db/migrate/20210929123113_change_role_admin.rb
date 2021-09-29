class ChangeRoleAdmin < ActiveRecord::Migration[6.1]
  def change
    change_column :roles, :admin, :boolean, default: false
  end
end
