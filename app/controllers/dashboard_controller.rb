class DashboardController < ApplicationController
  before_action :authenticate_login!, :check_new_user, :check_accepted

  def index
    @users = User.all
  end

  private

  def check_accepted
    if current_login.user.signup_request == nil
      redirect_to "/waiting"
    elsif current_login.user.signup_request == false
      redirect_to "/rejected"
    else
      redirect_to "/users/, #{current_login.user.id}"
    end
  end

  def check_new_user
    if !current_login.user
      user = User.new
      user.login_id = current_login.id
      user.save
      check_accepted
    end
  end

end