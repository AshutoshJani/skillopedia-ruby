class Api::V1::SkillsController < ApplicationController

  def index
    skills = Skill.all
    
    render json: SkillSerializer.new(skills).serialized_json
  end

end