class Skill < ApplicationRecord
  belongs_to :master_skill
  belongs_to :user

  validates :exp_month, :exp_year, :self_rating, presence: true
end
