class SkillSerializer
  include FastJsonapi::ObjectSerializer
  attributes :master_skill_id, :user_id, :self_rating, :exp_month, :exp_year

  belongs_to :master_skill
  belongs_to :user
end
