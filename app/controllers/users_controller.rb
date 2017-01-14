class UsersController < ApplicationController
	before_action :find_user, only: [:destroy]

	def show
	end 

	def create
	end

	def destroy
	end 

	private 

	def find_user
		@user = User.find(params[:id])
	end 

	def user_params
		params.require(:user).permit(:email, :password, :push?, :text?)
	end 
end