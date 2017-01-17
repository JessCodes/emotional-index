class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user)
      redirect_to user_path(@user)
    else
      render new_user_path
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    @chart = User.chart(@user)
  end

  def edit
    @user = User.find_by(id:params[:id])
    @favorites = @user.favorites
    @favorite = Favorite.new(:user_id => @user.id)
  end

  def update
    @user = User.find_by(id:params[:id])
    @user.update(user_params)

    redirect_to user_path(@user)
  end

  def destroy
    @user = User.find_by(id:params[:id])
    @user.destroys

    redirect_to root_path
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :phone, :push, :text)
  end

end
