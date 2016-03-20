class PagesController < ApplicationController
  def home
    @users = User.all
    @comments = Comment.all
    @full_comments = []
    @comments.each do |comment|
      replies = @comments.select { |reply| comment.id == reply.parent_comment_id }
      like_count = comment.get_likes.size
      dislike_count = comment.get_dislikes.size
      hash = {comment: comment, replies: replies}
      @full_comments << hash
    end
  end

  def test
    @comments = Comment.all
    comment_hash = {}
    @comments.each do |comment|
      # if comment is not a reply ...
      if comment.parent_comment_id == nil
        # ... gathers all replies to the comment
        reply_hash = {}
        @comments.each do |reply|
          if comment.id == reply.parent_comment_id
            reply_hash[reply.id.to_s.to_sym] = {
              comment: get_comment_info(reply),
              user: get_user_info(reply.user),
              votes: get_votes(reply)
            }
          end
        end
        comment_hash[comment.id.to_s.to_sym] = {
          comment: get_comment_info(comment),
          user: get_user_info(comment.user),
          votes: get_votes(comment),
          replies: reply_hash
        }
      end
    end
    @current_user = get_current_user_info
    @front_comments = comment_hash
  end

  def vote
    # @post.liked_by @user1
    # @post.unliked_by @user1

    # @post.disliked_by @user1
    # @post.undisliked_by @user1
  end

  private

  def get_current_user_info
    if user_signed_in?
      { id: current_user.id,
        is_logged: true,
        first_name: current_user.first_name,
        rating: current_user.rating,
        avatar_url: current_user.avatar_url }
    else
      {is_logged: false}
    end
  end

  def get_comment_info(comment)
    comment.user == current_user ? is_editable = true : is_editable = false
    { id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      is_editable: is_editable,
      fb_share_count: comment.fb_share_count }
  end

  def get_user_info(user)
    { id: user.id,
      created_at: user.created_at,
      first_name: user.first_name,
      last_name: user.last_name,
      rating: user.rating,
      avatar_url: user.avatar_url }
  end

  def get_votes(comment)
    # creates votes hash
    like_count       = comment.get_likes.size
    dislike_count    = comment.get_dislikes.size
    like_voters      = comment.get_likes.voters
    dislike_voters   = comment.get_dislikes.voters
    dislike_voters_info = get_voters_id(dislike_voters)
    like_voters_info    = get_voters_id(like_voters)
    votes = {
      like_count: like_count,
      like_voters: like_voters_info[:ids],
      is_liked: like_voters_info[:has_interacted],
      dislike_count: dislike_count,
      dislike_voters: dislike_voters_info[:ids],
      is_disliked: dislike_voters_info[:has_interacted]
    }
  end

  def get_voters_id(voters)
    voters_hash = {}
    voters_ids  = []
    voters.each { |voter| voters_ids << voter.id }
    voters.include?(current_user) ? has_interacted = true : has_interacted = false
    voters_hash = {ids: voters_ids, has_interacted: has_interacted}
  end
end

# # retrieves votes
# @comments.each do |comment|
#   # retrieves like / dislike count
#   like_count = comment.get_likes.size
#   dislike_count = comment.get_dislikes.size

#   # retrieves voters IDs
#   voters = comment.get_likes.voters
#   voters_ids = []
#   voters.each { |voter| voters_ids << voter.id }

#   {votes: {like_count: like_count, dislike_count: like_count, voters_id: voters_id}
# end



