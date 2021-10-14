class Api::V1::MasterProjectsController < ApplicationController

  def index
    projects = MasterProject.all

    render json: MasterProjectSerializer.new(projects).serialized_json
  end

end