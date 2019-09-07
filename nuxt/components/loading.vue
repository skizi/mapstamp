<template>
	<section class="loading_cover">
		<p class="status"></p>
		<a href="#" target="_blank" class="facebook_share_btn btn0 facebook">FaceBookに投稿！</a>
		<a href="#" target="_blank" class="download_btn btn0 download">ダウンロード</a>
	</section>
</template>


<style lang="scss">
  /*@import "../../sass/import/_vars.scss";*/


.loading_cover{
    width:320px;
    height:100%;
    background-color:rgba(0, 0, 0, 0.7);
    display: none;
    opacity: 0;
    position:fixed;
    top:0px;
    left:0px;
    background-image:url("/img/loading.gif");
    background-repeat:no-repeat;
    background-position:center center;
    transition-duration: 0.3s;
    transition-property: opacity;
    z-index: 1;

    p{
        width: 100%;
        margin-top: 28px;
        position: absolute;
        top: 50%;
        text-align: center;
        color: #fff;
        font-size: 12px;
        letter-spacing: 1px;
    }

    a.facebook_share_btn,
    a.download_btn{
        opacity:0;
        display: none;
        margin-top: 60px;
        margin-left: -150px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
    }
}


@media screen and (min-width: 375px) {
    .loading_cover{
        width:100%;
    }
}

</style>


<script>
import Vue from 'vue';
// import Util from 'Util';
import Util from '@/assets/js/Util'

  
export default {

  name: 'Loading',

  mounted: function() {

    if (process.browser) {
    	this.element = document.getElementsByClassName( 'loading_cover' )[0];
    	this.text = this.element.getElementsByTagName( 'p' )[0];
    	this.faceBookShareBtn = this.element.getElementsByClassName( 'facebook_share_btn' )[0];
    	this.faceBookShareBtn.addEventListener( Util.clickEventName, this.clickBtn.bind( this ) );

    	this.downloadBtn = this.element.getElementsByClassName( 'download_btn' )[0];
    	this.downloadBtn.addEventListener( Util.clickEventName, this.clickBtn.bind( this ) );

    	this.timeoutId;
    }
    
  },


  methods: {

	showLoading( message ){

		this.text.innerHTML = message;
		this.element.style.display = 'block';
		clearTimeout( this.timeoutId );
		this.timeoutId = setTimeout(function(){
			this.element.style.opacity = 1;
		}.bind( this ), 100 );
	
	},


	hideLoading(){

		this.element.style.opacity = 0;
		clearTimeout( this.timeoutId );
		this.timeoutId = setTimeout(function(){
			this.element.style.display = 'none';
			this.text.innerHTML = '';
		}.bind( this ), 300 );

	},


	setText( message ){

		this.text.innerHTML = message;

	},


	showFaceBookShareBtn( url ){

		this.faceBookShareBtn.style.display = 'block';
		setTimeout(function(){
			this.faceBookShareBtn.style.opacity = 1;
			this.faceBookShareBtn.setAttribute( 'href', url );
		}.bind( this ), 100 );

	},


	showDownloadBtn( url ){

		this.downloadBtn.style.display = 'block';
		setTimeout(function(){
			this.downloadBtn.style.opacity = 1;
			this.downloadBtn.setAttribute( 'href', url );
		}.bind( this ), 100 );

	},


	clickBtn( e ){

		this.faceBookShareBtn.style.opacity = 1;
		this.faceBookShareBtn.style.display = 'none';
		this.downloadBtn.style.opacity = 1;
		this.downloadBtn.style.display = 'none';
		
		this.hideLoading();

	}

  },


  watch: {
    
    loading( to, from ){

    	switch( to.state ){

    		case 'show':
    			this.showLoading( to.message );
    			break;

    		case 'hide':
    			this.hideLoading();
    			break;

    		case 'changeMessage':
    			this.setText( to.message );
    			break;

    		case 'showFacebook':
    			this.showLoading( to.message );
    			this.showFaceBookShareBtn( to.url );
    			break;

    		case 'showDownloadBtn':
    			this.showDownloadBtn( to.url );
    			break;

    	}

    }

  },


  props : {
  	loading : Object
  }

};

</script>