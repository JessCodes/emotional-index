require 'faker'

emotions = %w[joy sorrow anger surprise]

20.times do 
	user = User.create({
		email: Faker::Internet.email,
		phone: Faker::PhoneNumber.phone_number,
		push?: true,
		text?: true
		})
	user.days.create({
		emotion: emotions.sample
		})
	user.favorites.create({
		interests: Faker::Beer.name
		})
end 