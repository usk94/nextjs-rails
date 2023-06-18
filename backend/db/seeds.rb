file = File.read(Rails.root.join('db', 'books.json'))
data = JSON.parse(file)

data.each do |item|
  Book.create(item)
end