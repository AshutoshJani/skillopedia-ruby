class DashboardController < ApplicationController
  before_action :authenticate_login!, :check_new_user

  def index
    @users = User.all
  end

  private

  def check_new_user
    if !current_login.user
      user = User.new
      user.login_id = current_login.id
      user.save
      redirect_to api_v1_user_path(user)
    end
  end

end