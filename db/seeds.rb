require 'faker'

emotions = %w[joy sorrow anger surprise]

20.times do
	user = User.create({
		email: Faker::Internet.email,
		phone: Faker::PhoneNumber.phone_number,
		push?: true,
		text?: true,
		password: "password"
		})

		user.favorites.create({
			interests: Faker::Beer.name
			})

		Timecop.freeze(Date.today - 7) do
			user.days.create({
				emotion: emotions.sample
				})
			end

		Timecop.freeze(Date.today - 6) do
			user.days.create({
				emotion: emotions.sample
				})
			end

		Timecop.freeze(Date.today - 5) do
			user.days.create({
				emotion: emotions.sample
				})
		end

		Timecop.freeze(Date.today - 4) do
			user.days.create({
				emotion: emotions.sample
				})
		end

		Timecop.freeze(Date.today - 3) do
			user.days.create({
				emotion: emotions.sample
				})
		end

		Timecop.freeze(Date.today - 2) do
			user.days.create({
				emotion: emotions.sample
				})
		end

		Timecop.freeze(Date.today - 1) do
			user.days.create({
				emotion: emotions.sample
				})
		end

		Timecop.freeze(Date.today) do
			user.days.create({
				emotion: emotions.sample
				})
		end
end
