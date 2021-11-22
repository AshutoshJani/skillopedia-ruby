class EndorsementSerializer
  include FastJsonapi::ObjectSerializer
  attributes :endorsee_id, :endorser_id, :rating, :comment

  belongs_to :endorser, class_name: "User"
  belongs_to :endorsee, class_name: "User"
end