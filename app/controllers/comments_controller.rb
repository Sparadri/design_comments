class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comments_params)
    # current_user is given twice > once here & once in the app.js when updating state
    @comment.user = current_user
    @comment.save
    # should not render full JSON but only what's needed
    render json: @comment
  end

  def update
    p 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'
  end

  private

  def comments_params
    params.require(:comment).permit(:content, :parent_comment_id)
  end

end



# CHECK DISCOURSE TEXT INPUTS
# RECUPERER DU CODE DISCOURSE!!!
# exemple locales: https://github.com/discourse/discourse/blob/9f30a28a8e850ff3e35d7ed240687d987d33e197/config/locales/client.fr.yml

# show only some messages & view more on click
# linkState to work :)
# add messages counter as person scrolling
# do ajax call for likes
# add medium editor & / or redactor-js & medium-insert on rails assets
# componentWillMount for animation css comment pluggin loading
# fix time / hours
# add picture when person types his message (or when review?)
# add sponsored comment example?

# issue of likes / dislikes not working when replying
# display first + highlight post from a specific user
# CSS TRANSITION
# on modif / post message, should be able to see it live
# ...this.props > tu pass tous les composants à ton enfant
# TO CHECK KEEP IN MEMORY WHETHER USER HAS VOTED !!!!
# should i use library has_voted????
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
