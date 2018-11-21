Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter,
    Rails.application.secrets.twitter_api_key,
    Rails.application.secrets.twitter_api_secret

  provider :facebook,
  		Rails.application.secrets.facebook_api_key,
  		Rails.application.secrets.facebook_api_secret,
		scope: "email",
		display: "popup",
		client_options: {
			site: 'https://graph.facebook.com/v2.12',
			authorize_url: "https://www.facebook.com/v2.12/dialog/oauth"
		},
		local: "ja_JP",
		secure_image_url: true,
		auth_type: 'https',
		info_fields: "email, birthday, gender, first_name, last_name"
end 