require 'faker'

emotions = %w[joy sorrow anger surprise]

20.times do
	user = User.create({
		email: Faker::Internet.email,
		phone: Faker::PhoneNumber.phone_number,
		push: true,
		text: true,
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

jen = User.create(email:"jen@jen.com",
phone: "+19499230368",
push: true,
text: true,
password: "penis")

jen.favorites.create(interests:"Dogs")
jen.favorites.create(interests:"Puppy")
jen.favorites.create(interests:"Cal Football")
jen.favorites.create(interests:"Crazy Ex-Girlfriend")
jen.favorites.create(interests:"Rickroll")

Timecop.freeze(Date.today - 7) do
	jen.days.create({
		emotion: "joy"
		})
	end

Timecop.freeze(Date.today - 6) do
	jen.days.create({
		emotion: "anger"
		})
	end

Timecop.freeze(Date.today - 5) do
	jen.days.create({
		emotion: "anger"
		})
end

Timecop.freeze(Date.today - 4) do
	jen.days.create({
		emotion: "sorrow"
		})
end

Timecop.freeze(Date.today - 3) do
	jen.days.create({
		emotion: "joy"
		})
end

Timecop.freeze(Date.today - 2) do
	jen.days.create({
		emotion: "surprise"
		})
end

Timecop.freeze(Date.today - 1) do
	jen.days.create({
		emotion: "anger"
		})
end

Timecop.freeze(Date.today) do
	jen.days.create({
		emotion: "joy"
		})
end
