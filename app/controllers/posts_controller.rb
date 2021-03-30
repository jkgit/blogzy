class PostsController < ApplicationController
 before_action :authenticate
 ITEMS_PER_PAGE = 2

 def index
  @posts = Post.all.order("created_at DESC")
  if params[:p]
    current_page = params[:p].to_i || 0
    max_pages = (@posts.count / ITEMS_PER_PAGE).ceil
    # grab the page and return extra node
    @posts = @posts.slice(current_page * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
    result = { posts: posts_presenter(@posts), current_page: current_page, max_pages: max_pages}
  else
    result = @posts
  end
  render json: result
 end

 def show
  @post = Post.find(params[:id])
  render json: @post, include: :user
 end

 def create
  @post = Post.new(post_params.merge!(author_id: @current_user.id))

  if @post.save
    render json: @post
   else
    render json: {}, status: 501
   end
 end

 def update
  @post = Post.find(params[:id])

  if @post.update_attributes(post_params)
    render status: 200
  else
    render json: {}, status: 501
  end
 end

 def destroy
  Post.find(params[:id]).destroy
  render json: {}, status: 200
 end

 private

 def post_params
   params.permit(:title, :description, :body, :author_id)
 end

 def posts_presenter(posts)
   results = []
   posts.each do |post|
     results << post.as_json.merge(user: post.user.as_json)
   end
   results
 end
end
