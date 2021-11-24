class Api::V1::CurrentUserController < ApplicationController

  def index
    if login_signed_in?
      render json: current_login
    else
      render json: {}, status: 401
    end
  end

  def update
    user = User.find(params[:id])

    if (user.update(permit_signup_params))
      render json: user
    end
  end

  def logout
    sign_out(current_login)
    render json: {error: "", message: "Succefully logged out"}
  end

  private 

  def permit_signup_params
    params.permit(:signup_request)
  end
  
end