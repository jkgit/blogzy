class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def authenticate
    auth_header = request.headers['Authorization']
    begin
      email = JwtService.new(auth_header).check
      @current_user = User.find_by_email(email)
    rescue ActiveRecord::RecordNotFound => e
      render json: {}, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: {}, status: :unauthorized
    end
  end
end
