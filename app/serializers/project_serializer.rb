class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :master_project_id, :user_id

  belongs_to :master_projects
  belongs_to :users
end
