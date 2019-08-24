<template>
	<div class="about_container">
		<h3>自分が今いる場所を共有しよう！</h3>

		<ul class="examples">
			<li><img alt="MapPop 例1" src="/images/top/0.gif"></li>
			<li><img alt="MapPop 例2" src="/images/top/2.gif"></li>
		</ul>

		<p class="border_text">
			<span>地図の上に<br>キャラクターやかざりをデコって<br>TwitterやFaceBookに<br>シェアしよう！</span>
		</p>
		

		<a href="javascript:void(0);" class="btn0 start_btn c_mb40" @click="clickStartBtn()">はじめる！</a>

		<!--
		<section class="howto c_mb40">
			<h2 class="c_title1">マップスタンプってどんなサービス？</h2>
			<p class="c_mb40">
				地図の上にスタンプ、飾り、フィルター、メッセージ、アニメーションをつけてTwitterやFaceBookに現在地を共有できるサービスだよ！
			</p>

			<div class="example">
				<img alt="MapPop 例3" src="/images/top/1.gif">
				<p>こんなＧｉｆアニメが作れるよ！</p>
			</div>

			<h2 class="c_title1">どう使うの？</h2>
			<ul class="c_mb40 c_list0">
				<li>
					「はじめる！」ボタンをクリック！
				</li>
				<li>
					自分のいる現在地を、地図を移動したり拡大して決定しよう！
				</li>
				<li>
					地図にスタンプ、飾り、フィルター、メッセージ、アニメーションをつけてデコろう！
				</li>
				<li>
					Twitterアカウントもしくは、FaceBookアカウントでログイン後、<br>
					作成したGifアニメや画像をTwitter、FaceBookに共有しよう！
				</li>
			</ul>
		</section>
			
		<a href="javascript:void(0);" class="btn0 start_btn" @click="clickStartBtn()">はじめる！</a>
		-->
	</div>
</template>


<style lang="sass">
@import "../../_scss/_vars.scss";

.about_container{
    text-align: center;

    .examples{
    	@include clearfix;
    	width: 280px;
	    height: 135px;
    	margin: 0 auto 20px;
    	overflow:visible;

    	li{
    		margin-right: 10px;
    		float:left;
    		&:last-child{
    			margin-right: 0;
    		}

    		img{
			    width: 135px;
			    border-radius: 10px;
			    box-shadow: 0 2px 8px #b7b7b7;
    		}
    	}
    }

    h3{
		margin-bottom: 20px;
		font-size: 20px;
		letter-spacing: -1px;
		text-align: center;
		font-weight: bold;
		color: #ebb314;
    }

    .start_btn{
    	text-shadow: 0 0 4px #fff;
    }
}


.howto{
	text-align: left;
	width: 300px;
	margin: 0 auto;

	.example{
		text-align: center;

		img{
			margin-bottom: 10px;
		    border-radius: 10px;
		    box-shadow: 0 2px 8px #b7b7b7;
		}

		p{
		    font-size: 12px;
		    border-bottom: 2px solid #edbc2f;
		    border-style: dotted;
		    display: inline-block;
		}
	}
}

</style>


<script>
import Vue from 'vue';


module.exports = {

  name: 'About',

  mounted: function() {


  },


  methods: {

  	clickStartBtn : function(){

  		this.$store.commit( 'pageName', 'capture' );

  	}

  },

};

</script>