class Api::V1::CurrentUserController < ApplicationController

  def index
    if login_signed_in?
      render json: current_login
    else
      render json: {}, status: 401
    end
  end

  def logout
    sign_out(current_login)
  end
  
end