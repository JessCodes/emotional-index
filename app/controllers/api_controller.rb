class ApiController < ApplicationController
require 'httparty'
  def youtube
    @user = User.find_by(id: params[:id])
    fav = @user.favorites.sample.interests
    url = URI('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+fav+'&maxResults=1&alt=json&key='+ENV['YT_KEY'])
    response = HTTParty.get(url)
    render json: response.parsed_response["items"][0]["id"]["videoId"]
  end

  def gemo
    @user = User.find_by(id: params[:id])
    @new_emotion = @user.days.new(emotion: params[:emotion])

    if @new_emotion.save
      render json: "success"
    else
      render json: {errors: "not duck daddy"}
    end
  end

  def twilio
    @user = User.find_by(id: params[:id])
    @client = Twilio::REST::Client.new ENV['TWILIO_SID_KEY'], ENV['TWILIO_AUTH_KEY']
    begin
      @client.messages.create(
        body: "Never gonna give you up",
        to: @user.phone,
        from: "+19493572945"
      )
    rescue Twilio::REST::RequestError => error
      puts error.message
      flash[:notice] = "Something went wrong!"
    end
  end

  def giphy
    @user = User.find_by(id: params[:id])
    fav = @user.favorites.sample.interests
    Giphy::Configuration.configure do |config|
      config.api_key = ENV['GIPHY_KEY']
    end

    @image=Giphy.random(fav)
    @giphy = @image.id.to_s
    render json: @giphy
  end

  def gmaps
  end

end
