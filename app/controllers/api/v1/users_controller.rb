class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    
    render json: UserSerializer.new(users, options).serialized_json
  end

  def show
    user = User.find(params[:id])

    render json: UserSerializer.new(user, options).serialized_json
  end

  private 

  def options
    @options ||= { include: [:login] }
  end

end