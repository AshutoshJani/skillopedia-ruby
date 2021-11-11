class RoleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :master_role_id, :admin

  belongs_to :master_role
  belongs_to :user
end
