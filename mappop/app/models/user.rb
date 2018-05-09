class User < ApplicationRecord
	
	has_secure_password

	# メール送信時に使用する
	has_many :tokens
	
end
