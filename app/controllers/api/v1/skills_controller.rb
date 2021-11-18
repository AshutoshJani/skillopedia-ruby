class Api::V1::SkillsController < ApplicationController

  def index
    skills = Skill.all
    
    render json: SkillSerializer.new(skills).serialized_json
  end

  def update
    user = User.find(params[:id])
    m_skill = MasterSkill.find_by(permit_m_skill_params)

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
  end

  private

  def permit_skill_params
    params.permit(:self_rating, :exp_year, :exp_month)
  end

  def permit_m_skill_params
    params.permit(:skill_name)
  end

end