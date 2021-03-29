class PostsController < ApplicationController
 before_action :authenticate

 def index
  @posts = Post.all
  render json: @posts
 end

 def show
  @post = Post.find(params[:id])
  render json: @post
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

  if @post.update_attributes(post_param)
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
end
