class FavoritesController < ApplicationController
  before_action :find_user
  #
  # def new
  #   @user = User.find_by(id:params[:id])
  #   @favorite = Favorite.new
  # end

  def create
    @favorite = Favorite.create(fav_params.merge(user_id: @user.id))
    respond_to do |format|
      format.html {edit_user_path(@user)}
      format.js {}
    end

  end

  def destroy
    @favorite = Favorite.find_by(id:params[:id])
    @favorite.destroy

    respond_to do |format|
      format.html {redirect_to edit_user_path(user)}
      format.js { }
    end
  end

  private
  def fav_params
    params.require(:favorite).permit(:interests)
  end

  def find_user
    @user = User.find(params[:user_id])
  end
end
