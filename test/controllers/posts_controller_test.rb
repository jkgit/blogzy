require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user=User.where(email: 'test@test.com').first
    @token = JwtService.create(@user.email)
  end

  test "retrieve all posts when empty" do
    get "/posts", params: nil, headers: {'Authorization' => @token}
    assert_response(:success)
    body = JSON.parse(response.body)
    assert_equal 2, body.count
  end

  test "retrieve all posts when there is a new posts" do
    post "/posts", params: {description: 'test', body: 'long text', title: 'test title', author_id: @user.id}, headers: {'Authorization' => @token}
    get "/posts", params: nil, headers: {'Authorization' => @token}
    assert_response(:success)
    body = JSON.parse(response.body)
    assert_equal 3, body.count
  end

  test "create new post fails without all required fields" do
    post "/posts", params: {description: 'test'}, headers: {'Authorization' => @token}
    assert_response(:error)
  end

  test "create new post succeeds with all required fields" do
    post "/posts", params: {description: 'test', body: 'long text', title: 'test title', author_id: @user.id}, headers: {'Authorization' => @token}
    assert_response(:success)
  end

  test "show details of a post" do
    p=Post.last
    get "/posts/#{p.id}", params: nil, headers: {'Authorization' => @token}
    assert_response(:success)
    body = JSON.parse(response.body)
    assert_equal p.id, body["id"]
  end

  test "delete a post" do
    p=Post.last
    delete "/posts/#{p.id}", params: nil, headers: {'Authorization' => @token}
    assert_response(:success)
    assert_equal 1, Post.count
  end
end
