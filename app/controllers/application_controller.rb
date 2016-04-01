class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  # If this is a preflight OPTIONS request, then short-circuit the
  # request, return only the necessary headers and return an empty
  # text/plain.

  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = '*'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end

  private

  def generate_comment_hash(comment, reply_hash)
    {
      type: "comment",
      comment: get_comment_details(comment),
      user:    get_user_info(comment.user),
      votes:   get_votes(comment),
      replies: reply_hash
    }
  end

  def generate_reply_hash(reply)
    {
      comment: get_comment_details(reply),
      user:    get_user_info(reply.user),
      votes:   get_votes(reply)
    }
  end

  def get_comment_details(comment)
    comment.user.id == current_user[:id] ? is_editable = true : is_editable = false
    { id:      comment.id,
      content: comment.content,
      created_at:  comment.created_at,
      is_editable: is_editable,
      fb_share_count: comment.fb_share_count }
  end

  def get_user_info(user)
    { id: user.id,
      created_at: user.created_at,
      first_name: user.first_name,
      last_name:  user.last_name,
      rating:     user.rating,
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
      like_count:  like_count,
      like_voters: like_voters_info[:ids],
      is_liked:    like_voters_info[:has_interacted],
      dislike_count:  dislike_count,
      dislike_voters: dislike_voters_info[:ids],
      is_disliked:    dislike_voters_info[:has_interacted]
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
