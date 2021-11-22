class Api::V1::EndorsementsController < ApplicationController

  def index
  endorsements = Endorsement.all

  render json: EndorsementSerializer.new(endorsements).serialized_json
  end

  def show 
  user = User.find(params[:id])
  endorsements = user.endorsees
  
  render json: EndorsementSerializer.new(endorsements).serialized_json
  end

end