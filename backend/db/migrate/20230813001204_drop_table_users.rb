class DropTableUsers < ActiveRecord::Migration[7.0]
  def change
    drop_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps
    end
  end
end
