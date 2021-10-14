class Api::V1::MasterSkillsController < ApplicationController

  def index
    skills = MasterSkill.all

    render json: MasterSkillSerializer.new(skills).serialized_json
  end

end