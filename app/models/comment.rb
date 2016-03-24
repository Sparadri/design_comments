class Comment < ActiveRecord::Base
  acts_as_votable

  belongs_to :user
  has_many :replies

  # type to be added for mapping
  validates :type, inclusion: { in: %w(picture text video link) }

  scope :replies, -> (parent_id) { where(parent_id: parent_id) }


end
