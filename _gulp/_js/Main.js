
import Util from './Util';
import UserAgent from './UserAgent';
import Map from './Map';
import Editor from './Editor';
import AnimationEditor from './AnimationEditor';
import Share from './Share';
import Loading from './Loading';
// import NewPostModal from './NewPostModal';
// import ShowPostModal from './ShowPostModal';


document.addEventListener( "DOMContentLoaded", function(){  

  new Main();

} );




class Main{

  constructor(){

    Util.ua = new UserAgent();
    Util.userId = app.user_id;
    if( app.loginFlag ) Util.loginProvider = app.provider;

    this.state = 'about';

    Util.clickEventName = 'touchend';
    if( Util.ua.platform == 'pc' ) Util.clickEventName = 'click';
    Util.clickEventName = 'click';

    Util.loading = new Loading();


    if( Util.ua.platform != 'pc' ){
      document.body.addEventListener( 'touchstart', function(){
        Util.downTime = new Date().getTime();
      }.bind( this ) );
    }

    this.moveTo = new MoveTo({ tolerance: 0, duration: 300, easing: 'easeOutQuart' });
    this.header = document.getElementsByTagName( 'header' )[0];


    this.aboutContainer = document.getElementsByClassName( 'about_container' )[0];
    // if( !this.aboutContainer.getElementsByClassName( 'twitter' )[0] ){
      this.startBtns = this.aboutContainer.getElementsByClassName( 'start_btn' );
      this.startBtns[0].addEventListener( Util.clickEventName, this.startBtnClickHandler.bind( this ) );
      this.startBtns[1].addEventListener( Util.clickEventName, this.startBtnClickHandler.bind( this ) );
    // }


    this.captureBtnContainer = document.querySelector( '.capture_btn_container' );
    this.captureBtn = document.querySelector( '.capture_btn_container .btn0' );
    this.captureBtn.addEventListener( Util.clickEventName, this.captureBtnClickHandler.bind( this ) );


    this.editor = new Editor();
    this.editor.element.addEventListener( 'ysdCallback', this.editorCallBackHandler.bind( this ) );


    this.map = new Map();
    this.map.element.addEventListener( 'ysdCallback', this.mapCallBackHandler.bind( this ) );
    this.editor.initFilterBtns();


    this.textEditor = document.getElementsByClassName( 'text_editor' )[0];
    this.textEditorBtn = this.textEditor.getElementsByClassName( 'btn0' )[0];
    this.textEditorBtn.addEventListener( Util.clickEventName, function(){
      this.nextBtnClickHandler();
      this.moveTo.move( this.header );
    }.bind( this ) );
    this.textarea = this.textEditor.getElementsByTagName( 'textarea' )[0];
    var oldText = this.textarea.value;
    setInterval( function(){
      if( oldText != this.textarea.value ){
        this.map.addText( this.textarea.value );
        oldText = this.textarea.value;
      }
    }.bind( this ), 1000 );

    this.animationEditor = new AnimationEditor();
    this.animationEditor.element.addEventListener( 'ysdCallback', this.animationEditorCallBackHandler.bind( this ) );


    this.share = new Share();
    this.share.element.addEventListener( 'ysdCallback', this.shareCallBackHandler.bind( this ) );

    this.prevBtn = document.querySelector( 'header .prev' );
    this.prevBtn.addEventListener( Util.clickEventName, this.prevBtnClickHandler.bind( this ) );
    this.nextBtn = document.querySelector( 'header .next' );
    this.nextBtn.addEventListener( Util.clickEventName, this.nextBtnClickHandler.bind( this ) );
    

    

    this.resize();
    window.onresize = this.resize.bind( this );

    /*
    document.querySelector( '#form0 input' ).addEventListener( 'change', function( e ){

      var file = e.target.files[0];

      var form0 = document.getElementById( 'form0' );
      var formData = new FormData(form0);
      // formData.append( 'upfile', blob, 'anime.gif' );
      formData.append( 'title', '東京なうｗ' );
      formData.append( 'content', '東京なうｗ' );
      formData.append( 'lat', 1 );
      formData.append( 'lng', 1 );
      formData.append( 'user_id', 0 );
      formData.append( 'image_type', 'gif' );

      var url = Util.apiHeadUrl + '/post_images/create.json';
      $.ajax({
          url:url,
          type:'POST',
          data:formData,
          processData: false,
          contentType: false,
          success:function( result ){
              console.log( result );
          }.bind( this ),
          error:function( result ){
              console.log( result );
          }.bind( this )
      });

    }.bind(this) );
    */

    if( localStorage.getItem('cacheImgBase64') ){

        this.aboutContainer.style.display = 'none';

        this.state = 'share';

        this.prevBtn.style.display = 'block';
        this.nextBtn.style.display = 'none';

        //map
        this.map.setInterface( 'share' );
        this.map.setHeight( 320 );
        var lat = localStorage.getItem('cacheLat');
        var lng = localStorage.getItem('cacheLng');
        this.map.setLatLng( lat, lng );
        setTimeout(function(){
          this.map.capture();
        }.bind( this ), 1000 );

        //share
        this.share.show();
        this.share.removeStorageItem();

    }


    setTimeout(function(){

        this.captureBtnContainer.style.display = 'none';
        this.editor.hide();
        this.textEditor.style.display = 'none';
        this.animationEditor.hide();
        this.share.hide();

    }.bind( this ), 1000 );
    
  }


  prevBtnClickHandler(){

    switch( this.state ){

      case 'map':
        this.state = 'about';
        this.aboutContainer.style.display = 'block';
        this.captureBtnContainer.style.display = 'none';

        this.prevBtn.style.display = 'none';
        this.nextBtn.style.display = 'block';
        
        this.map.setInterface( 'about' );
        this.map.setHeight( 150 );
        break;

      case 'editor':
        this.state = 'map';
        this.captureBtnContainer.style.display = 'block';
        this.map.setInterface( 'map' );
        this.editor.hide();

        this.prevBtn.style.display = 'block';
        this.nextBtn.style.display = 'block';
        break;

      case 'textEditor':
        this.state = 'editor';
        this.textEditor.style.display = 'none';
        this.map.setInterface( 'editor' );
        this.setEditor();

        this.prevBtn.style.display = 'block';
        this.nextBtn.style.display = 'block';
        break;

      case 'animationEditor':
        this.state = 'textEditor';
        this.animationEditor.hide();
        this.textEditor.style.display = 'block';
        // this.textarea.focus();
        this.map.setInterface( 'share' );

        this.prevBtn.style.display = 'block';
        this.nextBtn.style.display = 'block';
        break;

      case 'share':
        this.state = 'animationEditor';
        this.map.setInterface( 'share' );
        this.share.hide();
        this.animationEditor.show();

        this.prevBtn.style.display = 'block';
        this.nextBtn.style.display = 'block';
        break;

    }

    gtag('event', this.state, {'event_category': 'prevState', 'event_label': 'click', 'value': this.state });
  }


  nextBtnClickHandler(){

    switch( this.state ){

      case 'about':
        this.startBtnClickHandler();
        break;

      case 'map':
        this.captureBtnClickHandler();
        break;

      case 'editor':
        this.state = 'textEditor';
        this.map.setInterface( 'share' );
        this.editor.hide();
        this.textEditor.style.display = 'block';
        // this.textarea.focus();
        break;

      case 'textEditor':
        this.state = 'animationEditor';
        this.map.setInterface( 'share' );
        this.textEditor.style.display = 'none';
        this.animationEditor.show();
        break;

      case 'animationEditor':
        this.state = 'share';
        this.map.setInterface( 'share' );
        this.animationEditor.hide();
        this.share.show();

        this.nextBtn.style.display = 'none';
        break;

    }


    gtag('event', this.state, {'event_category': 'nextState', 'event_label': 'click', 'value': this.state });

  }


  startBtnClickHandler(){

    this.state = 'map';

    this.aboutContainer.style.display = 'none';
    this.captureBtnContainer.style.display = 'block';

    this.prevBtn.style.display = 'block';
    this.nextBtn.style.display = 'block';
    
    this.map.setInterface( 'map' );
    this.map.setHeight( 320 );

    this.moveTo.move( this.header );

  }


  captureBtnClickHandler(){

    this.map.capture();
    this.state = 'editor';
    this.map.setInterface( 'editor' );
    this.setEditor();

    this.moveTo.move( this.header );

  }


  setEditor(){

    this.editor.show();
    this.captureBtnContainer.style.display = 'none';

  }

  
  mapCallBackHandler( e ){
    
    var obj = e.detail.value;
    switch( obj.type ){

      // case 'popupClick':
      //   this.showPostModal.refresh();
      //   this.showPostModal.setText( obj.data );
      //   this.showPostModal.show();
      //   break;

      case 'generateBlob':
        var pluseMessage = document.getElementsByClassName( 'pluse_message' )[0].value;
        obj.content = pluseMessage + ' ' + obj.content;
        this.share.submit( obj.blob, obj.lat, obj.lng, obj.content, obj.imgType );
        break;

    }
  }


  editorCallBackHandler( e ){

    var obj = e.detail.value;
    switch( obj.type ){

      case 'selectStamp':
        this.map.addStamp( obj.img, obj.index );
        break;

      case 'selectDecoration':
        this.map.addDecoration( obj.img, obj.index );        
        break;

      case 'selectFilter':
        this.map.addFilter( obj.img, obj.index );        
        break;

      case 'submit':
        this.nextBtnClickHandler();
        this.moveTo.move( this.header );
        break;

    }

  }


  animationEditorCallBackHandler( e ){

    var obj = e.detail.value;
    switch( obj.type ){

      case 'select':
        this.map.addAnimation( obj.data );
        break;

      case 'submit':
        this.nextBtnClickHandler();
        this.moveTo.move( this.header );
        break;

    }

  }


  shareCallBackHandler( e ){

    var obj = e.detail.value;
    switch( obj.type ){

      case 'generateGif':
        this.map.generateGif();
        if( obj.notLoginFlag ){//今からログインする場合はデータ保存
          this.map.saveData();
        }
        break;

    }

  }


  resize(){

    clearTimeout( this.resizeTimeOutId );
    this.resizeTimeOutId = setTimeout(function(){
      this.map.resize();
    }.bind( this ), 100 );

  }

}