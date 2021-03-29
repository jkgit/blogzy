class Post < ApplicationRecord
  validates :title, :presence => true
  validates :body, :presence => true
  validates :description, :presence => true
  validates :author_id, :presence => true
end
