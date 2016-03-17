# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Comment.destroy_all
Reply.destroy_all

# creates users
10.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email("first_name"),
    password: '00000000',
    avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
    rating: (1..100).to_a.sample
   )
  p "#{user.first_name} created"
  # to be added in users
    # user_likes = (0..300).to_a.sample
    # p user_likes

    # user_dislikes = (0..100).to_a.sample
    # p user_dislikes

  # creates comments
  (1..2).to_a.sample.times do
    comment = Comment.create(
      content: Faker::Lorem.sentence(3, true),
      user_id: user.id,
      created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
      like_count: (0..50).to_a.sample,
      dislike_count: (0..50).to_a.sample,
      fb_share_count: (0..10).to_a.sample
    )
    p "#{comment.user.first_name}'s message: #{comment.content} is created"

    (0..1).to_a.sample.times do
      reply = Reply.create(
        content: Faker::Lorem.sentence(3, true),
        user: User.all.sample,
        comment: Comment.all.sample,
        created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
        like_count: (0..5).to_a.sample,
        dislike_count: (0..5).to_a.sample,
        fb_share_count: (0..2).to_a.sample
      )
      p "#{reply.user.first_name}'s reply: #{comment.content} is created"
    end
  end
end

