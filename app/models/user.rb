class User < ApplicationRecord
  belongs_to :login

  has_many :skills
  has_many :master_skills, through: :skills

  has_many :projects
  has_many :master_projects, through: :projects

  has_one :role
  has_one :master_role, through: :role
end
