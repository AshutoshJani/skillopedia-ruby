class MasterSkillSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :skill_name

  has_many :skills
  has_many :users
end
