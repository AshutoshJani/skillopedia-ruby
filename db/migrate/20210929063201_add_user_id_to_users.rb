class AddUserIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :user, references: :login, foreign_key: true
  end
end
