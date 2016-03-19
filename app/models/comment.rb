class Comment < ActiveRecord::Base
  acts_as_votable

  belongs_to :user
  has_many :replies



end
