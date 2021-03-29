require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "authorization fails with wrong password" do
    u=User.create(email: 'test@test.com', password: 'plain')
    assert_nil u.login("nothing")
  end

  test "authorization succeeds with correct password" do
    u=User.create(email: 'test@test.com', password: 'plain')
    token = u.login("plain")
    assert_not_nil token
  end
end
