class ChangeDescriptionTypeInBooksAfterTableDrop < ActiveRecord::Migration[7.0]
  def up
    change_column :books, :description, :text
  end

  def down
    change_column :books, :description, :string
  end
end
