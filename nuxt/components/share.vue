<template>
	<div class="share">

		<textarea maxlength="30" placeholder="画像と一緒に投稿するメッセージを入力してね。" class="pluse_message"></textarea>

		<a href="javascript:void(0);" class="btn0 twitter">Twitterにシェアする</a>
		<a href="javascript:void(0);" class="btn0 facebook">FaceBookにシェアする</a>
		<a href="javascript:void(0);" class="btn0 download">画像をダウンロードする</a>
	</div>
</template>


<style lang="scss">

.home_index .interface{
  .share{
    //display:none;

    textarea{
      width: 300px;
      max-width: 290px;
      height: 60px;
      line-height: 30px;
      margin: 0 auto 10px;
        display: block;
      float:none;
        text-align: left;
    }

    .btn0{
      margin-bottom: 20px;
    }

    img.gif{
      width: 200px;
      margin: 0 auto 50px;
      display: block;
    }
  }
}


.btn0.twitter,
.btn0.facebook,
.btn0.download{
    width: 270px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    padding-left: 30px;
    display: block;
    box-sizing:initial;
    border-radius: 5px;
    background-color: #55acee;
    background-image: url(/img/twitter_icon.png);
    background-size: auto 18px;
    background-repeat: no-repeat;
    background-position: 15px 50%;
    text-align: center;
    color: #fff;
    font-size: 15px;
    text-decoration: none;
    letter-spacing: 0px;
    transition-duration: 0.3s;
    transition-property: opacity;

    box-shadow: 1px 1px 0px #3d8ac5,
                2px 2px 0px #3d8ac5,
                3px 3px 0px #3d8ac5,
                4px 4px 0px #3d8ac5;

    &:link,
    &:visited{
        color:#fff;
    }

    &:hover{
        opacity: 0.8;
    }
}



.btn0.facebook{
  background-color:#44598e;
    box-shadow: 1px 1px 0px #374771,
                2px 2px 0px #374771,
                3px 3px 0px #374771,
                4px 4px 0px #374771;
    background-image: url(/img/facebook_icon.png);
    background-position: 19px 50%;
}
.btn0.download{
  background-color:#ebb314;
    box-shadow: 1px 1px 0px #bc8e10,
                2px 2px 0px #bc8e10,
                3px 3px 0px #bc8e10,
                4px 4px 0px #bc8e10;
    padding-left: 0;
    width: 300px;
    background-image:none;
    letter-spacing: 2px;
}
</style>


<script>
import Util from '@/assets/js/Util'
import axios from 'axios';


export default {

  name: 'Share',

  mounted() {

    if (process.browser) {
      this.element = document.querySelector( '.share' );

      let btns = this.element.getElementsByClassName( 'btn0' );
      btns[0].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'twitter' ) );
      btns[1].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'facebook' ) );
      btns[2].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'download' ) );


      this.postImageId = -1;


      if( localStorage.getItem('cacheImgBase64') ){
        var base64 = localStorage.getItem('cacheImgBase64');
        var imgType = localStorage.getItem('cacheImgType');
        
        var blob = this.dataURLtoBlob( base64, imgType );
        var content = localStorage.getItem('cacheMessage');
        var pluseMessage = localStorage.getItem('cachePluseMessage');
        this.provider = localStorage.getItem('cacheProvider');
        var lat = localStorage.getItem('cacheLat');
        var lng = localStorage.getItem('cacheLng');

        this.$store.commit( 'loading', { state:'changeMessage', message:'Gifアニメを生成しています。' } );

        this.removeStorageItem();
        this.submit( blob, lat, lng, content, imgType );


        document.getElementsByClassName( 'pluse_message' )[0].value = pluseMessage;

      }
      
      // this.authenticity_token = document.getElementById( 'authenticity_token' ).value;
      
    }

  },


  watch: {
    
    //shareに変更が加えられたら == gidまたは画像がジェネレートされたら
    share( to, from ){

      this.submit( to.blob, to.lat, to.lng, to.content, to.imgType );

    },

  },


  methods : {

    removeStorageItem(){

        localStorage.removeItem('cacheImgBase64');
        localStorage.removeItem('cacheImgType');
        localStorage.removeItem( 'cacheMessage' );
        localStorage.removeItem( 'cachePluseMessage' );
        localStorage.removeItem( 'cacheProvider' );
        localStorage.removeItem( 'cacheLat' );
        localStorage.removeItem( 'cacheLng' );

    },


    btnClickHandler( provider, e ){

      this.provider = provider;
      var str = 'Gifアニメを生成しています。';
      var notLoginFlag = false;
      if( this.provider == 'twitter' && Util.loginProvider != 'twitter' || this.provider == 'facebook' && Util.loginProvider != 'facebook' ){
        str = 'ログインしています。';
        notLoginFlag = true;
        e.preventDefault();
      }

      this.$store.commit( 'loading', { state:'show', message:str } );
      this.$store.commit( 'generateGif', { state:'generateGif', notLoginFlag:notLoginFlag } );

    },


    submit( blob, lat, lng, content, imgType ){

      //まだログインしていない場合はログインさせる
      //画像データを一時保存
      if( this.provider == 'twitter' && Util.loginProvider != 'twitter' ){
        var reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
          var dataURI = reader.result;
          var pluseMessage = document.getElementsByClassName( 'pluse_message' )[0].value;
          localStorage.setItem( 'cacheImgBase64', dataURI );
          localStorage.setItem( 'cacheImgType', imgType );
          localStorage.setItem( 'cacheMessage', content );
          localStorage.setItem( 'cachePluseMessage', pluseMessage );
          localStorage.setItem( 'cacheProvider', this.provider );
          localStorage.setItem( 'cacheLat', lat );
          localStorage.setItem( 'cacheLng', lng );

          location.href = Util.apiHeadUrl + '/auth/' + this.provider;
        }.bind( this );
        return;
      }



      if( this.postImageId != -1 ){
        this.submitStep2( this.postImageId, imgType, content );
        return;
      }

      //mapStampサーバーにPOST
      this.blob = blob;

      var formData = new FormData();
      var name = 'anime.gif';
      if( imgType == 'png' ) name = 'image.png';
      formData.append( 'upfile', blob, name );
      formData.append( 'title', content );
      formData.append( 'content', content );
      formData.append( 'lat', lat );
      formData.append( 'lng', lng );
      formData.append( 'user_id', Util.userId );
      formData.append( 'image_type', imgType );
      formData.append( 'provider', this.provider );
      // formData.append( 'authenticity_token', this.authenticity_token );

      var url = Util.apiHeadUrl + '/post_images/create.json';
      this.postAxios( url, formData, function( response ){
        this.submitStep2( response.id, imgType, response.content );
      }.bind( this ),
      function(){
        this.$store.commit( 'loading', { state:'hide' } );
        alert( 'あれれ、エラーです。もう一度試してみよう！' );
      }.bind( this ) );

    },


    submitStep2( postImageId, imgType, content ){

      this.postImageId = postImageId;

      // localStorage.setItem( 'imgId', postImageId );
      // localStorage.setItem( 'imgType', imgType );

      //ダウンロード
      if( this.provider == 'download' ){

        var url = Util.apiHeadUrl + '/post_images/' + this.postImageId;
        this.$store.commit( 'loading', { state:'showDownloadBtn', url:url, message:'ダウンロードボタンを押してください。' } );

      }else if( this.provider == 'facebook' ){

        this.postFacebook( content );

      }else if( this.provider == 'twitter' ){

        this.postTwitter( this.blob, imgType, content );

      }

    },


    postFacebook( content ){
        

        // content += 'スタンプでデコって現在地を共有できるwebサービス、MapStamp！ Map data openstreetmap.org'
        this.postImageUrl = 'https://www.mapstamp.net/post_images/' + this.postImageId;
        var url = 'http://www.facebook.com/sharer.php?src=bm&u=' + encodeURI( this.postImageUrl ) + '&t=' + encodeURI( content );

        this.$store.commit( 'loading', { state:'showFacebook', message:'投稿ボタンを押して下さい。', url:url } );
       

    },


    postTwitter( blob, type, message ){

      this.$store.commit( 'loading', { state:'changeMessage', message:'Twitterに投稿しています。' } );

      var formData = new FormData();
      var name = 'anime.' + type;
      formData.append( 'upfile', blob, name );
      formData.append( 'provider', 'twitter' );

      var pluseMessage = document.getElementsByClassName( 'pluse_message' )[0].value;

      message = pluseMessage + ' ' + message + ' | スタンプでデコって現在地を共有できるwebサービス、MapStamp！ https://www.mapstamp.net #MapStamp Map data © OpenStreetMap'
      formData.append( 'message', message );

      var url = Util.apiHeadUrl + '/home/post_sns';
      this.postAxios( url, formData, function(){
        this.$store.commit( 'loading', { state:'hide' } );
        alert( '投稿完了！' );
      }.bind( this ),
      function(){
        this.$store.commit( 'loading', { state:'hide' } );
        alert( 'あれれ、エラーです。もう一度試してみよう！' );
      }.bind( this ) );

    },



    postAxios( url, formData, successCallback, errorCallback ){

      this.$store.dispatch('postMessage' , { url:url, formData:formData, successCallback:successCallback, errorCallback:errorCallback } );
      
    },


    // refreshFacebookDebugger( postImageId ){
      
    //   var url = Util.apiHeadUrl + '/home/refresh_facebook_debugger';
    //   $.ajax({
    //       url:url,
    //       type:'POST',
    //       data:{
    //         post_image_id:postImageId
    //       },
    //       success:function( result ){
    //           console.log( result );
    //       }.bind( this ),
    //       error:function( result ){
    //           console.log( result );
    //       }.bind( this )
    //   });

    // },


    getFormData( filename, mimeType, imageData, message ){

      // this is the multipart/form-data boundary we'll use
      var boundary = '----ThisIsTheBoundary1234567890';

      // let's encode our image file, which is contained in the var
      var formData = '--' + boundary + '\r\n'
      formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
      formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
      for ( var i = 0; i < imageData.length; ++i )
      {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
      }
      formData += '\r\n';
      formData += '--' + boundary + '\r\n';
      formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
      formData += message + '\r\n'
      formData += '--' + boundary + '--\r\n';

      return formData;

    },


    getFormData2( dataURI ){

      let byteString = atob(dataURI.split(',')[1]);
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {
          type: 'image/gif'
      });

    },


    dataURLtoBlob( dataurl, type ) {
        var bin = atob(dataurl.split("base64,")[1]);
        var len = bin.length;
        var barr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            barr[i] = bin.charCodeAt(i);
        }
        return new Blob([barr], {
            type: 'image/' + type,
        });
    }

  },


  props : {
    share : Object
  }

};

</script>