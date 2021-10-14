class MasterRoleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :role_name

  has_many :roles
  has_many :users
end
