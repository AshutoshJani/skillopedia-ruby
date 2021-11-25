class LoginSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email

  attribute :curr_user_id do |obj|
    "#{obj.user.id}" if !obj.user.present?
  end

  has_one :user
end
