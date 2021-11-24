class EndorsementSerializer
  include FastJsonapi::ObjectSerializer
  attributes :endorsee_id, :endorser_id, :rating, :comment

  attribute :endorsee_name do |object|
    "#{object.endorsee.full_name}"
  end

  attribute :endorser_name do |object|
    "#{object.endorser.full_name}"
  end

  belongs_to :endorser, class_name: "User"
  belongs_to :endorsee, class_name: "User"
end