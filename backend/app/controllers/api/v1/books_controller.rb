class Api::V1::BooksController < ApplicationController
  def index
    session[:foo] = 'FOO'
    p "session", session.keys
    p "session id", session.id
    session.clear
    p "session after", session.keys
    render json: { books: Book.all }
  end

  def show
    book = Book.find(params[:id])
    render json: { book: book }
  end

  def create
    Book.create!(book_params)
  end

  def destroy
    book = Book.find(params[:id])
    book.destroy!
  end

  def delete_all
    Book.delete_all
  end

  private
    def book_params
      params.require(:book).permit(:title, :description, :image, :author, :page_count, :published_at, :price)
    end
end