class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  include SessionsHelper

  #SPA対応 https://qiita.com/mshibuya/items/129c7d681d820958edd1
  # include ActionController::RequestForgeryProtection
  # protect_from_forgery with: :exception
  # after_action :set_csrf_token_header

  # def set_csrf_token_header
  #   response.set_header("X-CSRF-Token", form_authenticity_token)
  # end

end
