class DashboardController < ApplicationController
  before_action :authenticate_login!

  def index
    @users = User.all
  end

end