<template>
	<section class="loading_cover">
		<p class="status"></p>
		<a href="#" target="_blank" class="facebook_share_btn btn0 facebook">FaceBookに投稿！</a>
	</section>
</template>


<style lang="sass">
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
    background-image:url("/images/loading.gif");
    background-repeat:no-repeat;
    background-position:center center;
    transition-duration: 0.3s;
    transition-property: opacity;

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

    a.facebook_share_btn{
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

  
module.exports = {

  name: 'Loading',

  mounted: function() {

	this.element = document.getElementsByClassName( 'loading_cover' )[0];
	this.text = this.element.getElementsByTagName( 'p' )[0];
	this.faceBookShareBtn = this.element.getElementsByClassName( 'facebook_share_btn' )[0];
	// this.faceBookShareBtn.addEventListener( Util.clickEventName, this.shareFaceBook.bind( this ) );
	this.timeoutId;

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


	// shareFaceBook( e ){

	// 	if( this.shareFaceBookCallBack ) this.shareFaceBookCallBack();

	// 	this.faceBookShareBtn.style.opacity = 0;
	// 	setTimeout(function(){
	// 		this.faceBookShareBtn.style.display = 'block';
	// 	}.bind( this ), 300 );
	// }

  },


  watch: {
    
    loadingState( to, from ){

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

    	}

    }

  },


  props : {
  	loadingState : Object
  }

};

</script>