class Api::V1::RoleController < ApplicationController

  def index
    role = Role.all

    render json: RoleSerializer.new(role).serialized_json
  end

end