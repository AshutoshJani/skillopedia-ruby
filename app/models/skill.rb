class Skill < ApplicationRecord
  belongs_to :master_skill
  belongs_to :user
end
