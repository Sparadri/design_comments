class PagesController < ApplicationController
  def home
    @users = User.all
    @comments = Comment.all
  end
end
