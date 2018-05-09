class PostImagesController < ApplicationController
  
  def show
  	@postImage = PostImage.find( params[:id] )
  end


  def new
    @postImages = PostImage.new
  end


  def all
    @postImages = PostImage.all
  end


  def create

    @postImage = PostImage.create(
      user_id: params['user_id'],
      title: params['title'],
      image_type: params['image_type'],
      content: params['content'],
      lat: params['lat'],
      lng: params['lng']
    )

    #画像があれば保存
    if params['upfile']
      file = params['upfile']
      name = @postImage[:id].to_s + '.' + file.original_filename.split('.')[1]

      perms = ['.jpg', '.jpeg', '.gif', '.png']
      if !perms.include?( File.extname( name ).downcase )
        result = 'アップロードできるのは画像ファイルのみです'
      elsif file.size > 1.megabyte
        result = 'ファイルサイズは1MBまでです。'
      else 
        File.open(Rails.root.to_s+"/public/images/post_images/#{name}", 'wb') { |f| f.write(file.read) }
        result = "#{name}をアップロードしました。"
      end
    end

    respond_to do |format|
      if @postImage.save
        if params['provider'] == 'facebook'
          refresh_facebook_debugger( @postImage[:id] )
        end
        log_in @postImage
        format.html { redirect_to @postImage, notice: result }
        format.json { render :show, status: :created, location: @postImage }
      else
        format.html { render :new }
        format.json { render json: @postImage.errors, status: :unprocessable_entity }
      end
    end
  end


  def refresh_facebook_debugger( post_image_id )

    id = ERB::Util.url_encode( 'https://www.mapstamp.net/post_images/' + post_image_id.to_s )
    access_token = '1604539589666300|457c199bddab554c2380e99899e8199c' 
    url = 'https://graph.facebook.com/?scrape=true&id=' + id + '&access_token=' + access_token;
    result = connectApi( url )

    # if result[ :message ] == 'success'
    #   render json: result[ :result ], status: :ok
    # else
    #   render json: {status: :ng, code: 500, content: {message: result[ :message ] }}
    # end

    return result
  
  end


  def connectApi( uri )

    uri = URI.parse( uri )
    response = Net::HTTP.new( uri.host, uri.port ) 
    response.use_ssl = true
    response = response.start() do |http|
      # 接続時に待つ最大秒数を設定
      http.open_timeout = 5
      # 読み込み一回でブロックして良い最大秒数を設定
      http.read_timeout = 10
      # ここでWebAPIを叩いている
      # Net::HTTPResponseのインスタンスが返ってくる
      http.get(uri.request_uri)
    end


    begin

      case response
      
      when Net::HTTPSuccess
        # responseのbody要素をJSON形式で解釈し、hashに変換
        @result = JSON.parse(response.body)
        @message = 'success'
      
      when Net::HTTPRedirection
        @message = "Redirection: code=#{response.code} message=#{response.message}"
      # その他エラー
      else
        @message = "HTTP ERROR: code=#{response.code} message=#{response.message}"
      end

    # エラー時処理
    rescue IOError => e
      @message = "e.message"
    rescue TimeoutError => e
      @message = "e.message"
    rescue JSON::ParserError => e
      @message = "e.message"
    rescue => e
      @message = "e.message"
    end

    return { result: @result, message: @message }

  end
  

  def post_image_params
    params.require(:post_image).permit(:user_id, :title, :image_type, :view_count, :lat, :lng, :content )
  end

end
