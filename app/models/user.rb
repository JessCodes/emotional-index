class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :days
  has_many :favorites

  validates :email, :crypted_password, :phone, presence: true
  def self.chart(user)
    sorrow = user.days.where(emotion: 'sorrow').count
    joy = user.days.where(emotion: 'joy').count
    surprise = user.days.where(emotion: 'surprise').count
    anger = user.days.where(emotion: 'anger').count

    LazyHighCharts::HighChart.new('graph') do |f|
      f.chart(backgroundColor: '#5B5151')
      # f.title({:text=>"yo feelings"})
      f.series(:type=> 'pie',:name=> 'Total days',
        :data=> [
          {:name=> 'Sorrow', :y=> sorrow, :color=> '#547980'},
          {:name=> 'Joy', :y=> joy,:color=> '#9DE0AD'},
          {:name=> 'Surprise', :y=> surprise,:color=> '#E5FCC2'},
          {:name=> 'Anger', :y=> anger,:color=> '#45ADA8'}
        ],
        :center=> [550, 150], :size=> 300, :showInLegend=> false)
    end
  end
end
