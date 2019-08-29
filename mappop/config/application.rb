require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mappop
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.action_dispatch.default_headers = {
  	  'Access-Control-Allow-Credentials' => 'true',
  	  'Access-Control-Allow-Origin' => 'http://localhost:3000',
  	  'Access-Control-Request-Method' => '*'
  	}

    #SPA対応
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, {:key=>"_csrf_protection_example_session"}

    config.navigational_formats = [:json]


    config.api_only = true
  end
end
