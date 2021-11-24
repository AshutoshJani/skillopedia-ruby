class User < ApplicationRecord
  belongs_to :login

  attr_accessor :full_name
  def full_name
    "#{self.first_name} #{self.last_name}" 
  end

  has_many :skills
  has_many :master_skills, through: :skills

  has_many :projects
  has_many :master_projects, through: :projects

  has_one :role
  has_one :master_role, through: :role

  has_many :endorser_association, foreign_key: :endorser_id, class_name: "Endorsement"
  has_many :endorsers, through: :endorser_association

  has_many :endorsee_association, foreign_key: :endorsee_id, class_name: "Endorsement"
  has_many :endorsees, through: :endorsee_association

  # validates :login_id, uniqueness: true

end
