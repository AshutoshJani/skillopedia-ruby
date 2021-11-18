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
    m_skill = MasterSkill.find_by(permit_m_skill_params)
    permitted_email = permit_login_params
    byebug
    
    if (user.master_role == nil) 
      user.master_role = m_role
    end

    if (!user.master_skills.exists?(m_skill.id))
      skl = user.skills.new(
        master_skill_id: m_skill.id,
        user_id: user.id
      )
      # skl = user.skills.find_by(master_skill_id: m_skill.id)
      skl.update(permit_skill_params)
    elsif (user.master_skills.exists?(m_skill.id))
      skl = user.skills.find_by(master_skill_id: m_skill.id)
      skl.update(permit_skill_params)
    end

    if user.update(permit_user_params)
      render json: user
    end

    if (login.update(permitted_email)) || (user.master_role != m_role)
      user.master_role = m_role
      render json: user
    end

    if (user.update(permit_signup_params))
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

  def permit_skill_params
    params.permit(:self_rating, :exp_year, :exp_month)
  end

  def permit_m_skill_params
    params.permit(:skill_name)
  end

  def permit_signup_params
    params.require(:user).permit(:signup_request)
  end

end