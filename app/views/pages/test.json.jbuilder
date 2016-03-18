# json.comments(@full_comments) do |full_comment|
#   json.comment_id  full_comment[:comment][:id]
#   json.content full_comment[:comment], :id, :content, :created_at, :like_count, :dislike_count, :fb_share_count
#   json.user full_comment[:comment].user, :id, :created_at, :first_name, :last_name, :rating, :avatar_url
# end

json.set! :comments do
  @full_comments.each do |full_comment|
    json.set! full_comment[:comment].id.to_s do
      json.content full_comment[:comment], :id, :content, :created_at, :like_count, :dislike_count, :fb_share_count
      json.user full_comment[:comment].user, :id, :created_at, :first_name, :last_name, :rating, :avatar_url
      json.set! :replies do
        full_comment[:replies].each do |reply|
          json.set! reply.id.to_s do
            json.content reply, :id, :content, :created_at, :like_count, :dislike_count, :fb_share_count
            json.user reply.user, :id, :created_at, :first_name, :last_name, :rating, :avatar_url
          end
        end
      end
    end
  end
end
# json.comments do
#   json.array! @full_comments do |full_comment|
#     json.comment do
#       json.content full_comment[:comment]
#       json.user full_comment[:comment].user

#       json.replies do
#         json.array! full_comment[:replies] do |reply|
#           json.content reply
#           json.user reply.user
#         end
#       end
#     end
#   end
# end
