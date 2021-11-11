class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :first_name, :last_name, :exp_year, :exp_month, :github, :login_id, :signup_request

  belongs_to :login

  has_many :skills
  has_many :master_skills

  has_one :role
  has_one :master_role

  has_many :projects
  has_many :master_projects

end
