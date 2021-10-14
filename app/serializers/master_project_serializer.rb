class MasterProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :proj_name

  has_many :projects
  has_many :users
end
