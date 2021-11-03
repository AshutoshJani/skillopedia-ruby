class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    
    render json: UserSerializer.new(users, options).serialized_json
  end

  def show
    user = User.find(params[:id])

    render json: UserSerializer.new(user, options).serialized_json
  end

  def create
    user = User.new
    user.login_id = current_login
    user.save

    render json: UserSerializer.new(user,options).serialized_json
  end

  def update
    user = User.find(params[:id])
    login = user.login
    m_role = MasterRole.find_by(permit_role_params)
    permitted_email = permit_login_params

    if (user.master_role == nil) 
      user.master_role = m_role
    end

    user.update(permit_user_params)

    if (login.update(permitted_email)) || (user.master_role != m_role)
      user.master_role = m_role
      render json: user
    end

  end

  private 

  def options
    @options ||= { include: [:login] }
  end

  def permit_user_params
    params.require(:user).permit(:first_name, :last_name, :exp_year, :exp_month, :github)
  end

  def permit_login_params
    params.permit(:email)
  end

  def permit_role_params
    params.permit(:role_name)
  end

  def permit_proj_params
    params.permit(:curr_proj)
  end

end