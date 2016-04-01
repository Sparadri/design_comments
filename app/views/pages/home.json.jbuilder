json.global_stats @global_stats
json.current_user @current_user
json.comments @items


# VARIABLE KEYS IN JSON
# json.current_user current_user, :id, :first_name, :rating, :avatar_url if user_signed_in?
# json.set! :comments do
#   @full_comments.each do |full_comment|
#     json.set! full_comment[:comment].id.to_s do
#       json.comment full_comment[:comment], :id, :content, :created_at, :like_count, :dislike_count, :fb_share_count
#       json.user full_comment[:comment].user, :id, :created_at, :first_name, :last_name, :rating, :avatar_url
#       json.set! :replies do
#         full_comment[:replies].each do |reply|
#           json.set! reply.id.to_s do
#             json.comment reply, :id, :parent_comment_id, :content, :created_at, :like_count, :dislike_count, :fb_share_count
#             json.user reply.user, :id, :created_at, :first_name, :last_name, :rating, :avatar_url
#           end
#         end
#       end
#     end
#   end
# end

# FIRST JSON
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
