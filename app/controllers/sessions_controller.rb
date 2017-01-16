class SessionsController < ApplicationController
  def new
  end

  def create
    if login(params[:email], params[:password])
      redirect_to user_path(session[:user_id])
    else
      flash[:notice] = "Your username or password didn't match"
      redirect_to login_path
    end
  end

  def destroy
    logout
    redirect_to(root_path, notice: 'Logged out!')
  end
end
