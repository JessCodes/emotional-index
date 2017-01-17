class ApiController < ApplicationController
require 'httparty'
  def youtube
    ENV['YT_KEY']
    url = URI("https://www.googleapis.com/youtube/v3/search?part=snippet&q='puppies'&maxResults=1&order=viewCount&alt=json&key="+ENV['YT_KEY'])
    response = HTTParty.get(url)
    # Full json response
    p response.parsed_response
    # videoId from YouTube API
    render json: response.parsed_response["items"][0]["id"]["videoId"]
  end

  def gemo
    ENV['GEMO_KEY']
  end

  def twilio
    @client = Twilio::REST::Client.new ENV['TWILIO_SID_KEY'], ENV['TWILIO_AUTH_KEY']
    begin
      @client.messages.create(
        body: "hello",
        to: "+19499230368",
        from: "+19493572945"
      )
    rescue Twilio::REST::RequestError => error
      puts error.message
      flash[:notice] = "Something went wrong!"
    end
  end

  def giphy
    Giphy::Configuration.configure do |config|
      config.api_key = ENV['GIPHY_KEY']
    end
    @image=Giphy.random("puppies")
    # @giphy = @image.image_url.to_s
    @giphy = @image.id.to_s
    render json: @giphy

  end

  def gmaps
  end

end
