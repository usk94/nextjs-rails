class DeleteBooks < ActiveRecord::Migration[7.0]
  def change
    drop_table :books
  end
end
