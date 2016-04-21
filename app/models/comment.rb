class Comment < ActiveRecord::Base
  acts_as_votable

  belongs_to :user
  has_many :replies

  # type to be added for mapping
  validates :content_type, inclusion: { in: %w(picture text video link) }

  scope :replies, -> (parent_comment_id) { where(parent_comment_id: parent_comment_id) }
  scope :my_comments, -> (user_id) { where(user_id: user_id) }

  scope :all_comments, -> { where(parent_comment_id: nil) }
  scope :all_replies, -> { where("parent_comment_id IS NOT NULL") }
  scope :article, -> (article_id) { where(article_id: article_id)}
end
