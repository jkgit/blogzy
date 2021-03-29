require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "create new user succeeds with all required fields" do
    post "/users", params: {email: 'test@test.com', password: '1234567890'}
    assert_response(:success)
  end

  test 'login user with incorrect password fails' do
    post "/users/login", params: {email: 'test@test.com', password: '1234567890'}
    assert_response(:unauthorized)
  end

  test 'login user with unknown email fails' do
    post "/users/login", params: {email: 'tester@test.com', password: 'plain'}
    assert_response(:unauthorized)
  end

  test 'login user with known email and correct password succeeds' do
    post "/users/login", params: {email: 'test@test.com', password: 'plain'}
    assert_response(200)
    body = JSON.parse(response.body)
    decoded = JWT.decode(body['token'], JwtService::SECRET_KEY)
    assert_equal decoded[0]['sub'], 'test@test.com'
  end
end
