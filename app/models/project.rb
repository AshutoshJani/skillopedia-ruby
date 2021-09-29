class Project < ApplicationRecord
  belongs_to :master_project
  belongs_to :user
end
