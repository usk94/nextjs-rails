class Api::V1::UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: { user: user }
  end

  def create
    User.create!(user_params)
  end

  def destroy
    user = User.find(params[:id])
    user.destroy!
  end

  private
    def user_params
      params.require(:user).permit(:name, :email)
    end
end