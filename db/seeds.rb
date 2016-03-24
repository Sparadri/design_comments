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
controlled_content <<
"
<p>I'm sure they will succeed !</p>
  <p>
    <ol>
      <li>
        <span style='line-height: 1.4;'>people are willing to <b>communicate</b> more :)</span>
        <br>
      </li>
      <li>
        <span style='line-height: 1.4;'>
          companies feel the urgency of <i><u>building strong communities</u></i> !
        </span>
      </li>
      <li>
        <span style='line-height: 1.4;'>there is a need for
        <u>bottom-up participation</u> on most media sites</span>
      </li>
    </ol>let me know what you think !
  </p>
"

controlled_content <<
"
<p>
  Shared content through social media plays an ever increasing role in bringing more traffic to your website. <i>Make you best users' comments more visible &amp; shareable by your whole community</i>.<br>
</p>
"
controlled_content <<
"
<p>
  Shared content through social media plays an ever increasing role in bringing more traffic to your website. <i>Make you best users' comments more visible &amp; shareable by your whole community</i>.<br>
</p>
"

User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: 'adrien@mail.com',
  password: '00000000',
  avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
  rating: (1..100).to_a.sample
)
i = 0
# creates users
10.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(:first_name),
    password: '00000000',
    avatar_url: "http://lorempixel.com/200/200/people/#{(0..10).to_a.sample}/",
    rating: (1..100).to_a.sample
   )
  p "#{user.first_name}'s created"

  # creates comments
  i < controlled_content.length ? content = controlled_content[i] : content = Faker::Lorem.sentence(3, true)
  comment = Comment.create(
    content: content,
    user: user,
    content_type: "text",
    created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
    like_count: (0..50).to_a.sample,
    dislike_count: (0..50).to_a.sample,
    fb_share_count: (0..10).to_a.sample
  )
  p "#{comment.user.first_name}'s message: #{comment.content}"
  comments = Comment.all
  unless User.all.length < 3
    (0..5).to_a.sample.times do
      p comments.sample
      reply = Comment.create(
        content: Faker::Lorem.sentence(3, true),
        user: User.all.sample,
        content_type: "text",
        created_at: Faker::Time.between(DateTime.now - 10, DateTime.now),
        like_count: (0..5).to_a.sample,
        dislike_count: (0..5).to_a.sample,
        fb_share_count: (0..2).to_a.sample,
        parent_comment_id: comments.sample.id
      )
      p "#{reply.user.first_name}'s reply: #{reply.content} is created"
    end
  end
  i += 1
end

(20..40).to_a.sample.times do
  Comment.all.sample.liked_by User.all.sample
end
(10..20).to_a.sample.times do
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

