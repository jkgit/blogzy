class User < ApplicationRecord
  validates :email, :presence => true
  validates :password, :presence => true

  has_many :posts, foreign_key: 'author_id'

  def login(password_to_check)
    # in real life would one-way hash the password and not store plain text passwords
    if password == password_to_check
      JwtService.create(email)
    end
  end
end
