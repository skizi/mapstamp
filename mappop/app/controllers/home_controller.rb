class HomeController < ApplicationController
	protect_from_forgery except: :post_sns #エラー回避
  	# skip_before_action :verify_authenticity_token

	require 'twitter'
	require 'koala'

	def index
	end


	def post_sns

		if params['provider'] == 'twitter'
			if session[:secret].nil? || session[:token].nil?
				render 'no secret key or token.'
				return
			end
		elsif params['provider'] == 'facebook'
			if session[:token].nil?
				render 'no token.'
				return
			end
		end

		if params['provider'] == 'twitter'
			tw = Twitter::REST::Client.new do |config|
			  config.consumer_key        = "cfCaY1NoErQbGHDm7kVJk5Isz"
			  config.consumer_secret     = "GIjCaJZZ5wVbwdHdo844nZglsiKY0Fi8b5gMUqp5Zp6UKZBuMb"
			  config.access_token        = session[:token]
			  config.access_token_secret = session[:secret]
			  # config.access_token        = "77250350-7ORj461NmiM8w7K6YjvqqplWoiRS7tU39sXt72Ff6"
			  # config.access_token_secret = "31pi6NnKaKjgbkIUKlCypFRGLSNz5bwY61bSYZz2raiLR"
			end
		elsif params['provider'] == 'facebook'
			#以下のトークンは使用していない
			token = 'EAAWzUfxFJfwBAFhFlD1lUaNrXZB3xDwyUmveOHK2zDMUPePXFYvtZAy8ZCgS3SWR3slWr3R5tLcTqYm0vxHlNZATdHRMNrb46Nlqbj3MHtrn2RBXz2ZBL4ErJ0oZCSovVN9uaCZAbTJBGfAwsOaNp3XjiltOPjkl04j8BGmQTCCuEAT2rDV8JilExD8amkdzWOBB4PNVoUQMAZDZD'
		    graph = Koala::Facebook::API.new( session[:token] )
		end

		responce = nil

		if params['upfile']
			file = params['upfile']
        	# name = file.original_filename
        	if params['provider'] == 'twitter'
				images = [open(file)]
				responce = tw.update_with_media( params['message'], images)
			elsif params['provider'] == 'facebook'
				# responce = graph.put_wall_post("hogege", {
			 #      "name" => "リンク先の名前（タイトル）",
			 #      "link" => "http://hoge.html/",
			 #      "description" => "リンクの説明"
			 #    })
			    # responce = graph.put_video( open(file), {:caption => "キャプション", :description => "hogegeの説明", :privacy => { :value => "EVERYONE" } } )
			    responce = graph.put_picture( open(file), {:caption => "キャプション", :description => "hogegeの説明", :privacy => { :value => "EVERYONE" } } )
			end
			
		end

		render plain: responce

	end

end
