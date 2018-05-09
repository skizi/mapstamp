
import Util from './Util';


export default class Share{

  constructor(){

  	this.element = document.querySelector( '.share' );

    let btns = this.element.getElementsByClassName( 'btn0' );
    btns[0].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'twitter' ) );
    btns[1].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'facebook' ) );
    btns[2].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, 'download' ) );

    this.authenticity_token = document.getElementById( 'authenticity_token' ).value;

    //FaceBookのSDKをロード
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
      FB.init({
        appId: '1604539589666300',
        version: 'v2.7' // or v2.1, v2.2, v2.3, ...
      });

      FB.getLoginStatus(function( e ){
        if( e.authResponse ){
          Util.faceBookLoginFlag = true;
          Util.faceBookUserId = e.authResponse.userID;
          Util.faceBookToken = e.authResponse.accessToken;
        }
      });
    });

    if( localStorage.getItem('twitterImgBase64') && Util.loginProvider == 'twitter' ){
      Util.loading.showLoading( 'Twitterに投稿しています。' );
      var base64 = localStorage.getItem('twitterImgBase64');
      var type = localStorage.getItem('twitterImgType');
      var message = localStorage.getItem('twitterMessage');
      var blob = this.dataURLtoBlob( base64, type );
      this.postTwitter( blob, type, message );
      localStorage.removeItem('twitterImgBase64');
      localStorage.removeItem('twitterImgType');
      localStorage.removeItem( 'twitterMessage' );
    }

  }


  show( img ){

    this.element.style.display = 'block';

  }


  hide(){

    this.element.style.display = 'none';

  }


  btnClickHandler( provider, e ){

    if( Util.ua.platform != 'pc' ){
      if( new Date().getTime() - Util.downTime > Util.touchHitTime ) return;
    }

    this.provider = provider;
    Util.loading.showLoading( 'Gifアニメを生成しています。' );
    this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'generateGif' } } } ) );

  }


  submit( blob, lat, lng, content, imgType ){

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
    formData.append( 'authenticity_token', this.authenticity_token );

    var url = Util.apiHeadUrl + '/post_images/create.json';
    $.ajax({
        url:url,
        type:'POST',
        data:formData,
        processData: false,
        contentType: false,
        success:function( result ){
            this.submitStep2( result.id, imgType, result.content );
        }.bind( this ),
        error:function( result ){
            Util.loading.hideLoading();
            alert( 'あれれ、エラーです。もう一度試してみよう！' );
        }.bind( this )
    });

  }


  submitStep2( postImageId, imgType, content ){

    this.postImageId = postImageId;

    //ダウンロード
    if( this.provider == 'download' ){

      var a = document.createElement('a');
      var url = window.URL.createObjectURL( this.blob );
      a.href = url;
      a.download = "mapstamp." + imgType;
      document.body.appendChild( a );
      a.click();
      // URL.revokeObjectURL(url); //ios safariでバグ
      // window.open( url, '_blank'); //safariで動作しない

      Util.loading.hideLoading();

    }else if( this.provider == 'facebook' ){

      // var mobileFlag = false;
      // if( Util.ua.platform != 'pc' ) mobileFlag = true;
      if( Util.ua.browser == 'safari' ){
        Util.loading.setText( '投稿ボタンを押して下さい。' );
        Util.loading.showFaceBookShareBtn( this.shareFaceBook.bind( this, content ) );
      }else{
        Util.loading.setText( 'FaceBookに投稿しています。' );
        this.shareFaceBook( content );
      }

    }else if( this.provider == 'twitter' ){

      Util.loading.setText( 'Twitterに投稿しています。' );

      //Twitterでログインしていない場合はログインさせる
      //画像データを一時保存
      if( Util.loginProvider != 'twitter' ){
        var reader = new FileReader();
        reader.readAsDataURL(this.blob); 
        reader.onloadend = function() {
          var dataURI = reader.result;
          localStorage.setItem( 'twitterImgBase64', dataURI );
          localStorage.setItem( 'twitterImgType', imgType );
          localStorage.setItem( 'twitterMessage', content );
          location.href = '/auth/twitter';
        }
        return;
      }

      this.postTwitter( this.blob, imgType, content );

    }

  }


  postTwitter( blob, type, message ){

    var formData = new FormData();
    var name = 'anime.' + type;
    formData.append( 'upfile', blob, name );
    formData.append( 'provider', 'twitter' );
    message += ' | スタンプでデコって現在地を共有できるwebサービス、MapStamp！ https://www.mapstamp.net #MapStamp Map data © OpenStreetMap'
    formData.append( 'message', message );

    var url = Util.apiHeadUrl + '/home/post_sns';
    $.ajax({
        url:url,
        type:'POST',
        data:formData,
        processData: false,
        contentType: false,
        success:function( result ){
            Util.loading.hideLoading();
            alert( '投稿完了！' );
        }.bind( this ),
        error:function( result ){
            Util.loading.hideLoading();
            alert( 'あれれ、エラーです。もう一度試してみよう！' );
        }.bind( this )
    });

  }


  shareFaceBook( message ){

      message += 'スタンプでデコって現在地を共有できるwebサービス、MapStamp！ Map data openstreetmap.org'
      var postImageUrl = 'https://www.mapstamp.net/post_images/' + this.postImageId;
      FB.ui({
        method: 'share',
        href: postImageUrl,
        hashtag:'#MapStamp',
        // quote:message,
        app_id:1604539589666300,
        // redirect_uri:Util.apiHeadUrl,
        // mobile_iframe: mobileFlag
      }, function(response){
        if( response ) alert( '投稿完了！' );
        Util.loading.hideLoading();
      }.bind( this ));

  }


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

  // }


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

  }


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

  }


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

  resize(){
    
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;

  
  }

}
