class RemoveAndAddLoginIdFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_reference :users, :user, references: :login, foreign_key: true
    add_reference :users, :login, foreign_key: true
  end
end
