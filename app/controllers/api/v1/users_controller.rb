class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    
    render json: UserSerializer.new(users, options).serialized_json
  end

  def show
    user = User.find(params[:id])

    render json: UserSerializer.new(user, options).serialized_json
  end

  def update
    user = User.find(params[:id])
    if user.update(permit_params)
      render json: user
    end
  end

  private 

  def options
    @options ||= { include: [:login] }
  end

  def permit_params
    # params.permit(:first_name, :last_name, :email, :exp_year, :exp_month, :github, :role, :curr_proj, :id, :fn, :ln)
    params.require(:user).permit(:first_name, :last_name, :exp_year, :exp_month, :github)
  end

end