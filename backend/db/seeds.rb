# file = File.read(Rails.root.join('db', 'books.json'))
# data = JSON.parse(file)

# data.each do |item|
#   Book.create(item)
# end

Book.find_each do |record|
  record.update_column(:price, rand(1..100))
end