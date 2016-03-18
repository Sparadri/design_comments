class AddSocialToComments < ActiveRecord::Migration
  def change
    add_column :comments, :like_count, :integer, default: 0
    add_column :comments, :dislike_count, :integer, default: 0
    add_column :comments, :fb_share_count, :integer, default: 0
  end
end
