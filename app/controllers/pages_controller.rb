class PagesController < ApplicationController
  def home
    @users = User.all
    @replies = Reply.all
    @comments = Comment.all

    @full_comments = []

    @comments.each do |comment|
      replies = @replies.select { |reply| comment.id == reply.comment_id }
      hash = {comment: comment, replies: replies}
      @full_comments << hash
    end

  end
end
