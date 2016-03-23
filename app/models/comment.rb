class Comment < ActiveRecord::Base
  acts_as_votable

  belongs_to :user
  has_many :replies

  # type to be added for mapping
  validate :type, inclusion: { in: %w(picture text video link),

end
