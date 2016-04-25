class CommentsController < ApplicationController

  def create
    if current_user
      comment = Comment.new(comments_params)
      # current_user is given twice > once here & once in the app.js when updating state
      comment.content_type = "text"
      comment.user         = current_user
      comment.save
      comment_hash    = generate_comment_hash(comment, {})
      # should not render full JSON but only what's needed
      render json: comment_hash
    else
      comment = Comment.new(comments_params)
      # current_user is given twice > once here & once in the app.js when updating state
      comment.content_type = "text"
      comment.user         = User.all[0]
      comment_hash         = generate_comment_hash(comment, {})
      comment_hash[:comment][:created_at] = Time.now
      # should not render full JSON but only what's needed
      render json: comment_hash
    end
  end

  def update
  end

  def delete
    comment_id = params[:id]
    Comment.find(comment_id).destroy
    success = ["comment #{comment_id} deleted"]
    render json: success
  end

  def like
    if current_user
      comment = Comment.find(comments_params[:id])

      before_likes = comment.get_likes.length
      before_dislikes = comment.get_dislikes.length

      like    = comments_params[:likeChange].to_i
      dislike = comments_params[:dislikeChange].to_i

      comment.unliked_by    current_user if like == -1
      comment.liked_by      current_user if like == 1
      comment.disliked_by   current_user if dislike == 1
      comment.undisliked_by current_user if dislike == -1

      after_likes = comment.get_likes.length
      after_dislikes = comment.get_dislikes.length

      success = ["comment: '#{comment.content}' liked,
        before likes: #{before_likes},
        after likes: #{after_likes},
        before dislikes: #{before_dislikes},
        after dislikes: #{after_dislikes}"]
      render json: success
    else
      error = ["user needs to be signed to upvote"]
      render json: error
    end
  end

  private

  def comments_params
    params.require(:comment).permit(:content, :parent_comment_id, :comment, :id, :likeChange, :dislikeChange)
  end

end



# able to create comments even if nil
# to be changed: save



# view more comments
# only show top 2
# add parameters to show

# faire un tableau des fctionnalités de moderation que je souhaite développer

#
#
# to do list
#
# sorting comments > create arrays
# add example comment but do no record in database

# add in table > is_verified user
# REVIEW ALL CODE
# REDO MODAL

# do tabs on top >  best / all / my comments / my interactions
# in ppt, a comment summarizes an article
# record likes // dislikes in database
# CHECK DISCOURSE TEXT INPUTS
# RECUPERER DU CODE DISCOURSE!!!
# exemple locales: https://github.com/discourse/discourse/blob/9f30a28a8e850ff3e35d7ed240687d987d33e197/config/locales/client.fr.yml
# open graph parser

# linkState to work :)
# add medium editor & / or redactor-js & medium-insert on rails assets
# share on social networks

# do summary KPIs

# add messages counter as person scrolls
# do ajax call for likes
# componentWillMount for animation css comment pluggin loading
# fix time / hours
# add picture when person types his message (or when review?)

# issue of likes / dislikes not working when replying
# display first + highlight post from a specific user
# CSS TRANSITION
# on modif / post message, should be able to see it live
# ...this.props > tu pass tous les composants à ton enfant
# TO CHECK KEEP IN MEMORY WHETHER USER HAS VOTED !!!!
# on click else where disable & clear editing!!! with





# accepted_answer: false
# actions_summary: [{id: 2, can_act: true}, {id: 3, can_act: true}, {id: 4, can_act: true},…]
# admin: false
# avatar_template: "/user_avatar/try.discourse.org/mcwumbly/{size}/284_1.png"
# avg_time: 1
# can_accept_answer: false
# can_delete: false
# can_edit: false
# can_recover: false
# can_unaccept_answer: false
# can_view_edit_history: true
# can_wiki: false
# cooked: "<p>bag iPhone </p>↵↵<p> tofu Distillery Vice chips trade cray +1 hoodie booth irony party literally </p>↵↵<p> butcher Schlitz Squid Austin</p>"
# created_at: "2014-08-26T17:04:45.787Z"
# deleted_at: null
# display_username: "David McClure"
# edit_reason: null
# hidden: false
# hidden_reason_id: null
# id: 1622
# incoming_link_count: 0
# moderator: false
# name: "David McClure"
# post_number: 22
# post_type: 1
# primary_group_name: null
# quote_count: 0
# raw: "bag iPhone ↵↵ tofu Distillery Vice chips trade cray +1 hoodie booth irony party literally ↵↵ butcher Schlitz Squid Austin"
# reads: 5
# reply_count: 0
# reply_to_post_number: null
# score: 0.85
# staff: false
# topic_id: 301
# topic_slug: "what-happens-when-a-topic-has-over-1000-replies"
# trust_level: 1
# updated_at: "2014-08-26T17:04:45.787Z"
# user_deleted: false
# user_id: 70
# user_title: null
# username: "mcwumbly"
# version: 1
# wiki: false
# yours: false














# private method to retrieve element of DOM
# _textarea: function() {
#   return this.refs.textarea
# }
##################################


# <a class="button-submit" href="/wines/1183?latitude=48.8648524&amp;longitude=2.3798705&amp;store_id=1548">GO GET IT</a>

# wines?color=red&latitude=48.8648342&longitude=2.3798768999999997&pairing=viande&price=less-10

# add steps in questions

# asset_url > helper de rails qui ajoute une clef
# pre render of index only when JSON parsed
# lire doc jbuilder
# json.name, :name
# why not props displayed in chrome dev tool
# key not working
#
#
# on a callback with a jbuilder, does it update the whole json????


# Uncaught Error: Invariant Violation: setState(...): Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
# >> fait un tour à l'intérieur des fctions
# in child child when calling function handleClick > if put parenthis, runs it one time by default > does it mean we cannot pass arguments if we want to build generic functions to handle clicks????


# overflow

# media query for landscape

# react boostrap
# check bell react


# put component in variable and call variable in DOM


# link to dans img tag
# div flexbox > img tag


# ref & key > se met pas sur un objet react mais sur une div
# ES6 > no more that = this

# render uniquement pour class et styles


# ElementDidMount....
#
# when to put return in functions?


# what keyword for DOM element ($)
# cache strategy

# return toujours ac span ou div
# return = templating = html

# dans quels cas utilisés 'ref'
# return wishlist dans iteration
#

# how can i kill & re create a component in react?

# adding wine wishlist
# <i className="fa fa-bookmark" onClick={this.handleClick}></i>

# commit without wine controller & ability to get back
#
#
#
# help on UX discard wine


# PUBSUB
# > onclick change button color



# transform: translateX(-50%);
# scale
# rotate
# keyframe
# perspective (vite fait)
# animation
# >> cdn mozilla css

# https://desandro.github.io/3dtransforms/docs/card-flip.html





# var node = this.getDOMnode();
# .height()!!!!????
# moment.locale("fr")????
#
# react for sublime text
#
# .bind(this) on ajax call, why?
#  why ajax call on handleService & not in initial json?
#  super?
#
#  statistics cached
#
#  moment.js
#
#
