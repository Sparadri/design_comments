# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Comment.destroy_all
Advertiser.destroy_all
Advertising.destroy_all

controlled_content = []
controlled_content << "<p>I'm sure they will succeed !</p><p><ol><li><span style='line-height: 1.4;'>people are willing to <b>communicate</b> more :)</span><br></li><li><span style='line-height: 1.4;'>companies feel the urgency of <i><u>building strong communities</u></i> !</span></li><li><span style='line-height: 1.4;'>there is a need for <u>bottom-up participation</u> on most media sites</span></li></ol>let me know what you think !</p>"
controlled_content << "<p>Shared content through social media plays an ever increasing role in bringing more traffic to your website. <i>Make you best users' comments more visible &amp; shareable by your whole community</i>.<br></p>"
controlled_content << "<p>Users now want to <b>co-create </b>brand identity. As a matter of facts, brands should focus even more on <u>user generated content.</u>&nbsp;</p>"
controlled_content << "<p>I read in a marketing study that <b>retaining</b> a client is     <u><b>7x   harder</b></u> to than <b>acquiring</b> him! That's big!!</p>"
controlled_content << "<p>I think <i>moderation should be done by the community as well</i>: when someone's comments are disliked a lot over time, he should stop appearing on top... Otherwise it's <i>bad for user experience</i> :(</p>"
controlled_content << "<p>Currently it moderation only costs a lot to media publishers:</p><ul><li><b>Moderation is fully manual</b> &gt; so they try to<span style='line-height: 1.4;'>&nbsp;limit as much as possible discussions</span></li><li><b>Brand image suffers</b> &gt; because angry people / haters who are over represented<br></li><li><span style='line-height: 1.4;'><b>Very poor content </b>put forward does not reflect the quality of the community &amp; not rich media!</span></li></ul>"


User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: 'adrien@mail.com',
  password: '00000000',
  avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
  rating: (1..100).to_a.sample
)
# creates users
600.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(:first_name),
    password: '00000000',
    avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
    rating: (1..100).to_a.sample
   )
end

i = 0
controlled_content.length.times do
  # creates user
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(:first_name),
    password: '00000000',
    avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
    rating: (1..100).to_a.sample
   )

  # creates comment
  comment = Comment.create(
    content: controlled_content[i],
    user: user,
    content_type: "text",
    created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
    like_count: (0..50).to_a.sample,
    dislike_count: (0..50).to_a.sample,
    fb_share_count: (0..10).to_a.sample
  )
  p "#{comment.user.first_name}'s message: #{comment.content}"

  controlled_anwser = []
  controlled_anwser << "Yeahhhhhhhh!"
  controlled_anwser << "Thanks for you sharing!"
  controlled_anwser << "Capitalizing on users is key."

  controlled_anwser << "To my point of view, user retention increases as their interactions with content grows"
  controlled_anwser << "Agree!"
  controlled_anwser << "Agree with you."
  controlled_anwser << "People sharing on your website are ultimately brand advocates; even when they disagree ;)"
  controlled_anwser << "Media sites should build a strong algorithm to spot best commentors and reward by putting their content forward."
  controlled_anwser << "To me it's key that media sites propose a great on ALL platforms: mobile app, mobile site, desktop site. I read more & more on my way to work!!"
  controlled_anwser << "Onsite discussions are a great way to show how virant is your community"
  controlled_anwser << "I agree that the web is now social. By providing to your customers the best social experience, they will enrich your content."
  controlled_anwser << "I feel they fear us but i still don't get why..."
  controlled_anwser << "ohhh did not know"
  controlled_anwser << "That's how they should think!"
  controlled_anwser << "Empower users should be at the heart of any website's strategy ;)"

  (1..6).to_a.sample.times do
    answer = controlled_anwser.sample
    controlled_anwser.delete(answer)
    reply = Comment.create(
      content: answer,
      user: User.all.sample,
      content_type: "text",
      created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
      like_count: (0..5).to_a.sample,
      dislike_count: (0..5).to_a.sample,
      fb_share_count: (5..15).to_a.sample,
      parent_comment_id: comment.id
    )
    p "#{reply.user.first_name}'s reply: #{reply.content} is created"
  end
  i += 1
end

(50..80).to_a.sample.times do
  Comment.all.sample.liked_by User.all.sample
end
(20..30).to_a.sample.times do
  Comment.all.sample.disliked_by User.all.sample
end



# creates advertising
advertiser = Advertiser.create(
  name: "nike",
  avatar_url: "https://scontent-cdg2-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/550013_10151387007773445_409018869_n.jpg?oh=e4c912fc84ca4ba22ed9c98de1b14b3f&oe=5754116E")

Advertising.create(
  title: "Increase your speed with Nike !",
  picture: "http://s3.thingpic.com/images/uG/HEsnfh4Dx28Sd1efcSs4rfHB.jpeg",
  advertiser: advertiser
)

