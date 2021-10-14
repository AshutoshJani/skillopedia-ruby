class LoginSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email

  has_one :user
end
