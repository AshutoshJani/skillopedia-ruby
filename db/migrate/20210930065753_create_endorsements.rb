class CreateEndorsements < ActiveRecord::Migration[6.1]
  def change
    create_table :endorsements do |t|
      t.integer :endorsee_id, foreign_key: true
      t.integer :endorser_id, foreign_key: true
      t.float :rating
      t.text :comment

      t.timestamps
    end
  end
end
