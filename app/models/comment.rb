class Comment < ActiveRecord::Base
  acts_as_votable

  belongs_to :user
  has_many :replies

  # type to be added for mapping
  validates :content_type, inclusion: { in: %w(picture text video link) }

  scope :replies, -> (parent_comment_id) { where(parent_comment_id: parent_comment_id) }

end
