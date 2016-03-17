class PagesController < ApplicationController
  def home
    @users = User.all
    @replies = Reply.all
    @comments = Comment.all

    @full_comments = []

    @comments.each do |comment|
      replies = []
      @replies.select { |reply| comment == reply.comment }
      hash = {comment: comment, replies: @replies}
      @full_comments << hash
    end

  end
end
