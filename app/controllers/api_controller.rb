class ApiController < ApplicationController

  def youtube
    ENV['YT_KEY']
  end

  def gemo
    ENV['GEMO_KEY']
  end

  def twilio
    ENV['TWILIO_SID_KEY']
    ENV['TWILIO_AUTH_KEY']
  end

  def giphy
    ENV['GIPHY_KEY']
  end

  def gmaps
  end

end