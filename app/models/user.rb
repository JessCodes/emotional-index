class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :days
  has_many :favorites

  def self.chart(user)
  end
end
