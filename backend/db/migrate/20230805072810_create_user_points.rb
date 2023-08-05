class CreateUserPoints < ActiveRecord::Migration[7.0]
  def change
    create_table :user_points do |t|
      t.bigint :user_id, null: false
      t.integer :points, null: false, default: 0

      t.timestamps
    end
    add_index :user_points, :user_id, unique: true
  end
end
