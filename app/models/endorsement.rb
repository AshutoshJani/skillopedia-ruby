class Endorsement < ApplicationRecord
  belongs_to :endorser, class_name: "User"
  belongs_to :endorsee, class_name: "User"

end
