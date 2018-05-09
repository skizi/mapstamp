class SessionsController < ApplicationController
  include SessionsHelper

  def new
  end

  def create
    if !params[:session]
      render 'new'
      return
    end

  	#downcase：大文字を小文字に変換してくれる
    user = User.find_by(email: params[:session][:email].downcase)
    #user = User.find_by(:email => params[:session][:email])#.downcase

  	# render plain: user.password_digest.to_s + '!!!"
  	# render plain: user.authenticate( params[:session][:password] ).to_s
  	# return

    if user && user.password_digest && user.authenticate( params[:session][:password] )
    	#authenticateメソッド：引数の文字列がパスワードと一致するとUserオブジェクトを、間違っているとfalse返すメソッド
    	#reset_session
    	#session[:user_id] = user.id
    	log_in user
    	redirect_to user
    	#redirect_to params[:referer]
    else
      flash.now[:danger] = 'emailもしくはパスワードが間違っています'
      render 'new'
    end
  end


  def createSns
    
    reset_session

    auth_hash = request.env['omniauth.auth']
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    image_url = auth_hash[:info][:image]

    if provider.to_s == "facebook"
      nickname = auth_hash[:info][:first_name].to_s + ' ' + auth_hash[:info][:last_name].to_s
    else
      nickname = auth_hash[:info][:nickname]
    end

    token = auth_hash[:credentials][:token]
    secret = auth_hash[:credentials][:secret]


    user = User.find_or_create_by(provider: provider, uid: uid) do |user|
      user.name = nickname
      user.photo = image_url
      user.provider = provider
      user.uid = uid
    end


# request.env['omniauth.auth']に、OmniAuthによってHashのようにユーザーのデータが格納されている。

    # _user = User.where( provider: user.provider, uid: user.uid );
    # if _user.nil?
      session[:name] = user.name
      session[:photo] = user.photo
      session[:provider] = user.provider
      session[:uid] = user.uid
      session[:password] = user.provider
      session[:token] = token
      session[:secret] = secret
      redirect_to controller: 'users', action: 'create_on_sns', provider: user.provider
    # else
    #   log_in user
    #   redirect_to user
    # end
  
  end


  def destroy
  	log_out if logged_in?
  	redirect_to root_url
  end

end
