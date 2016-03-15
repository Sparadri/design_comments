class AddSocialToComments < ActiveRecord::Migration
  def change
    add_column :comments, :like_count, :integer
    add_column :comments, :dislike_count, :integer
    add_column :comments, :fb_share_count, :integer
  end
end
