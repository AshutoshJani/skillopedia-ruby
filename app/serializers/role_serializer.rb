class RoleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :master_role_id, :admin

  belongs_to :master_roles
  belongs_to :users
end
