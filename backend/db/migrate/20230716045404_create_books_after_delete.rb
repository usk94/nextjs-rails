class CreateBooksAfterDelete < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :published_at
      t.string :description
      t.integer :page_count
      t.string :author
      t.string :image
      t.timestamps
    end
  end
end
