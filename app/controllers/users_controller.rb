class UsersController < ApplicationController
 def create
  @user = User.new(user_params)

  if @user.save
    render json: @user
   else
    render json: {}, status: 501
   end
 end

 def login
  users = User.where(email: params[:email])
  render json: {}, status: :unauthorized and return if users.count == 0 #same response as incorrect password to keep them guessing

  user = users[0]
  token = user.login(params[:password])
  if token
    render json: {token: token}
  else
    render json: {}, status: :unauthorized
  end
 end

 private

 def user_params
   params.permit(:email, :password)
 end
end
