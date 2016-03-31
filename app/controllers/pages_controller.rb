class PagesController < ApplicationController
  def home
    # for jbuilder, making accessible variables
    @global_stats = get_global_stats
    @current_user = get_current_user_info
    @items        = generate_items_hash
  end

  def test
    # for jbuilder, making accessible variables
    @global_stats = get_global_stats
    @current_user = get_current_user_info
    @items        = generate_items_hash
  end

  def vote
  end

  private

  def get_global_stats
    comments_count = Comment.all_comments.count
    replies_count  = Comment.all_replies.count

    likes_count = 0
    Comment.all.each { |comment| likes_count += comment.get_likes.size }

    dislikes_count = 0
    Comment.all.each { |comment| dislikes_count += comment.get_dislikes.size }

    shares_count = 0
    Comment.all.each { |comment| shares_count += comment.fb_share_count }

    people_count = Comment.all.to_a.map! { |comment| comment.user.id }.uniq.count

    global_stats = {
      comments_count: comments_count,
      replies_count:  replies_count,
      likes_count:    likes_count,
      dislikes_count: dislikes_count,
      people_count:   people_count,
      shares_count:   shares_count
    }
  end

  def get_current_user_info
    if user_signed_in?
      { id: current_user.id,
        is_logged:  true,
        first_name: current_user.first_name,
        rating:     current_user.rating,
        avatar_url: current_user.avatar_url }
    else
      {is_logged: false}
    end
  end

  def generate_items_hash
    comments     = generate_ordered_comment_array
    ads          = generate_ad_array
    comment_hash = {}
    ad_index     = 0
    c_index      = 1000

    comments.each do |comment|
      # adding ads in the comments
      if ((c_index - 1000) % 3 == 1) && (ads[ad_index] != nil)
        comment_hash[c_index.to_s.to_sym] = ads[ad_index]
        ad_index += 1
        c_index  += 1
      end

      if comment.parent_comment_id == nil
        # ... gathers all replies to the comment
        replies     = Comment.replies(comment.id)
        reply_hash  = {}
        replies.each_with_index do |reply, r_index|
          r_index += 1000
          reply_hash[r_index.to_s.to_sym] = generate_reply_hash(reply)
        end
        comment_hash[c_index.to_s.to_sym] = generate_comment_hash(comment, reply_hash)
        c_index  += 1
      end
    end
    return comment_hash
  end

  def generate_ad_array
    advertisings = Advertising.all
    ad_array = []
    advertisings.each_with_index do |ad, index|
      ad_array <<
        {
        type: "ad",
        content: {
          id: ad.id,
          title: ad.title,
          picture: ad.picture
        },
        advertiser: get_advertiser_info(ad.advertiser)
        }
    end
    ad_array
  end

  def get_advertiser_info(advertiser)
    {
      id: advertiser.id,
      name: advertiser.name,
      avatar_url: advertiser.avatar_url
    }
  end

  def generate_ordered_comment_array
    comments = Comment.order(created_at: :desc)
    unordered_comment_array = []
    ordered_comment_array   = []
    comments.all.each do |comment|
      like_count     = comment.get_likes.size || 0
      dislike_count  = comment.get_dislikes.size || 0
      total          = like_count + dislike_count
      total > 0 ? score = WilsonScore.lower_bound(like_count, total) : score = 0
      unordered_comment_array << [score, comment]
    end
    unordered_comment_array.sort! {|a,b| b[0] <=> a[0]}
    unordered_comment_array.each {|a| ordered_comment_array << a[1]}
    ordered_comment_array
  end

end

# add in table > user is verified
# REVIEW ALL CODE
# REDO MODAL
# DO 2 DIFFERENT TEXT EDITORS DEPENDING ANSWER / NOT ANSWER
# do tabs on top >  best / all / my comments / my interactions
# in ppt, a comment summarizes an article

# # retrieves votes
# @comments.each do |comment|
# retrieves like / dislike count
# like_count = comment.get_likes.size
# dislike_count = comment.get_dislikes.size

# retrieves voters IDs
# voters = comment.get_likes.voters
# voters_ids = []
# voters.each { |voter| voters_ids << voter.id }

# {votes: {like_count: like_count, dislike_count: like_count, voters_id: voters_id}
# end



