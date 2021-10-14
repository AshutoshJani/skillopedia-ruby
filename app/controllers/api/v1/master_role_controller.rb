class Api::V1::MasterRoleController < ApplicationController

  def index
    roles = MasterRole.all

    render json: MasterRoleSerializer.new(roles).serialized_json
  end

end