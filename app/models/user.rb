class User < ApplicationRecord
  belongs_to :login

  has_many :skills
  has_many :master_skills, through: :skills
end
