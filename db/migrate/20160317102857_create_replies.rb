class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.string :content
      t.integer :like_count
      t.integer :dislike_count
      t.integer :fb_share_count
      t.references :user
      t.references :comment
      t.timestamps null: false
    end
  end
end


