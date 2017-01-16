class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to user_path(@user)
    else
      render new_user_path
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end



  private

  def user_params
    params.require(:user).permit(:email, :password, :phone, :push?, :text?)
  end

end
