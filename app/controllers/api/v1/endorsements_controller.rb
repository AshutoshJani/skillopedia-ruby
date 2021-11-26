class Api::V1::EndorsementsController < ApplicationController

  def index
    endorsements = Endorsement.all

    render json: EndorsementSerializer.new(endorsements).serialized_json
  end

  def show 
    user = User.find(params[:id])
    endorsements = user.endorsee_association
    
    render json: EndorsementSerializer.new(endorsements).serialized_json
  end

  def update
    obj = permit_endorse_params
    temp = Endorsement.find_by(endorser_id: obj[:endorser_id], endorsee_id: obj[:endorsee_id])
    if (temp)
      temp.update(permit_endorse_params)
    else
      temp = Endorsement.new(permit_endorse_params)
      temp.save
    end
  end

  private

  def permit_endorse_params
    params.require(:endorsement).permit(:endorser_id, :endorsee_id, :rating, :comment)
  end

end