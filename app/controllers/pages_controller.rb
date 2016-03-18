class PagesController < ApplicationController
  def home
    @users = User.all
    @comments = Comment.all

    @full_comments = []
    @comments.each do |comment|
      replies = @comments.select { |reply| comment.id == reply.parent_comment_id }
      hash = {comment: comment, replies: replies}
      @full_comments << hash
    end
  end

  def test
  end


end
