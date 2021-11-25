class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  
  private

  def after_sign_in_path_for(resource)
    cookies[:user_id] = { :value => "#{current_login.user.id}" }
    root_path
  end

end
