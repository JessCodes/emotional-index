class ApiController < ApplicationController

  def youtube
    ENV['YT_KEY']
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
  end

  def gmaps
  end

end