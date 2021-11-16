class DashboardController < ApplicationController
  before_action :authenticate_login!, :check_accepted

  def index
    @users = User.all
  end

  private

  def check_accepted
    if !current_login.user
      user = User.new
      user.login_id = current_login.id
      user.save
    end
    if current_login.user.signup_request == nil
      render component: 'SignupRequest/Waitlist'
    elsif current_login.user.signup_request == false
      render component: 'SignupRequest/Rejected'
    end
  end

end