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

    sorrow = @user.days.where(emotion: 'sorrow').count
    joy = @user.days.where(emotion: 'joy').count
    surprise = @user.days.where(emotion: 'surprise').count
    anger = @user.days.where(emotion: 'anger').count

    @chart = LazyHighCharts::HighChart.new('graph') do |f|
      f.title({:text=>"yo feelings"})
      f.series(:type=> 'pie',:name=> 'Total consumption',
        :data=> [
          {:name=> 'Sorrow', :y=> sorrow, :color=> 'blue'},
          {:name=> 'Joy', :y=> joy,:color=> 'green'},
          {:name=> 'Surprise', :y=> surprise,:color=> 'purple'},
          {:name=> 'Anger', :y=> anger,:color=> 'red'}
        ],
        :center=> [550, 150], :size=> 300, :showInLegend=> false)
    end
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
