class Api::V1::UserPointsController < ApplicationController
  before_action :set_post, only: [:show, :update]

  def show
    render json: { user_point: @user_point }
  end

  def create
    UserPoint.create!(user_point_params)
  end

  def update
    # TODO: paramsからnumber受け取って書き換える
  end

  private
    def set_user_point
      @user_point = UserPoint.find(params[:id])
    end

    def user_point_params
      params.require(:user_point).permit(:points, :user_id)
    end
end