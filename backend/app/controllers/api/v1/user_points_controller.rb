class Api::V1::UserPointsController < ApplicationController
  def show
    user_point = UserPoint.find(params[:id])
    render json: { user_point: user_point }
  end

  def create
    UserPoint.create!(user_params)
  end

  def update
    user_point = UserPoint.find(params[:id])
    # TODO: paramsからnumber受け取って書き換える
  end

  private
    def user_params
      params.require(:user_point).permit(:name, :email)
    end
end