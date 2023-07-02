class Api::V1::BooksController < ApplicationController
  def index
    render json: { books: Book.all }
  end

  def show
    book = Book.find(params[:id])
    render json: { book: book }
  end

  def create
    book = Book.create!(book_params)
    book.meanings.create!(meaning_params)
  end

  private
    def book_params
      params[:post].require(:book).permit(:body)
    end
end